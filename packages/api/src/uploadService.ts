import httpClient from './httpClient';
import { AxiosProgressEvent, AxiosRequestConfig } from 'axios';

export interface UploadResponse {
    url: string;
    filename?: string;
    size?: number;
    mimeType?: string;
}

export interface UploadOptions {
    onProgress?: (progress: number) => void;
    cancelToken?: any;
    abortSignal?: AbortSignal;
}

// ─────────── 分片上传相关类型 ───────────

export interface ChunkUploadOptions {
    /** 分片大小，默认 5MB */
    chunkSize?: number;
    /** 每片进度回调 (0-100) */
    onProgress?: (progress: number) => void;
    /** 可中断信号 */
    abortSignal?: AbortSignal;
    /** 并发分片数，默认 3 */
    concurrency?: number;
}

export interface CheckFileResult {
    /** 是否已存在（秒传） */
    exists: boolean;
    /** 秒传时直接返回的 URL */
    url?: string;
    /** 断点续传时已上传的分片索引 */
    uploadedChunks?: number[];
}

/** localStorage 中存储的上传进度 key 格式 */
const RESUME_KEY = (hash: string) => `upload_resume_${hash}`;

// ─────────── 客户端哈希计算（不依赖 Worker，直接在主线程分块读取）───────────

/**
 * 用增量方式读取文件并计算 MD5 哈希
 * 避免一次性将大文件装入内存
 */
async function computeFileHash(file: File): Promise<string> {
    // 使用 crypto.subtle 计算 SHA-256（浏览器原生，无需额外依赖）
    const CHUNK = 2 * 1024 * 1024; // 每次读 2MB
    const parts: ArrayBuffer[] = [];

    for (let offset = 0; offset < file.size; offset += CHUNK) {
        const blob = file.slice(offset, offset + CHUNK);
        const buf = await blob.arrayBuffer();
        parts.push(buf);
    }

    // 合并所有分块
    const total = parts.reduce((acc, p) => acc + p.byteLength, 0);
    const combined = new Uint8Array(total);
    let pos = 0;
    for (const p of parts) {
        combined.set(new Uint8Array(p), pos);
        pos += p.byteLength;
    }

    const hashBuf = await crypto.subtle.digest('SHA-256', combined);
    const hashArray = Array.from(new Uint8Array(hashBuf));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ─────────── LocalStorage 断点续传状态持久化 ───────────

function getResumeState(hash: string): number[] {
    try {
        const raw = localStorage.getItem(RESUME_KEY(hash));
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveResumeState(hash: string, uploadedChunks: number[]): void {
    try {
        localStorage.setItem(RESUME_KEY(hash), JSON.stringify(uploadedChunks));
    } catch { /* 静默失败 */ }
}

function clearResumeState(hash: string): void {
    try {
        localStorage.removeItem(RESUME_KEY(hash));
    } catch { /* 静默失败 */ }
}

// ─────────── 核心：分片上传主流程 ───────────

/**
 * 分片上传单个文件（含秒传 + 断点续传）
 */
async function uploadFileInChunks(
    file: File,
    type: 'video' | 'image' = 'video',
    options: ChunkUploadOptions = {}
): Promise<UploadResponse> {
    const { chunkSize = 5 * 1024 * 1024, onProgress, abortSignal, concurrency = 3 } = options;

    // ① 计算哈希（进度标记为"哈希计算中"，进度设为 0）
    onProgress?.(0);
    const hash = await computeFileHash(file);

    // ② 秒传检查
    const checkRes = await checkFile(hash, file.name);
    if (checkRes.exists && checkRes.url) {
        onProgress?.(100);
        return { url: checkRes.url, filename: file.name };
    }

    // ③ 断点续传：合并服务端已有分片 + 本地 localStorage 记录
    const serverUploaded = new Set<number>(checkRes.uploadedChunks ?? []);
    const localUploaded = new Set<number>(getResumeState(hash));
    const uploadedChunks = new Set<number>([...serverUploaded, ...localUploaded]);

    // ④ 切片
    const total = Math.ceil(file.size / chunkSize);
    const pendingIndexes: number[] = [];
    for (let i = 0; i < total; i++) {
        if (!uploadedChunks.has(i)) pendingIndexes.push(i);
    }

    // ⑤ 并发上传分片
    let completedChunks = uploadedChunks.size;

    const uploadChunkTask = async (index: number): Promise<void> => {
        if (abortSignal?.aborted) throw new DOMException('Aborted', 'AbortError');

        const start = index * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const chunk = file.slice(start, end);
        const chunkFile = new File([chunk], `${hash}-${index}`);

        const formData = new FormData();
        formData.append('chunk', chunkFile);
        formData.append('hash', hash);
        formData.append('index', String(index));
        formData.append('total', String(total));
        formData.append('filename', file.name);
        formData.append('type', type);

        await httpClient.post('/upload/chunk', formData, {
            signal: abortSignal,
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        completedChunks++;
        uploadedChunks.add(index);
        saveResumeState(hash, Array.from(uploadedChunks));
        onProgress?.(Math.round((completedChunks / total) * 95)); // 最多到 95%，合并完才 100%
    };

    // 并发执行（滑动窗口）
    const queue = [...pendingIndexes];
    const workers = Array.from({ length: Math.min(concurrency, queue.length || 1) }, async () => {
        while (queue.length > 0) {
            const index = queue.shift()!;
            await uploadChunkTask(index);
        }
    });
    await Promise.all(workers);

    // ⑥ 合并分片
    const mergeResult = await mergeChunks(hash, total, file.name, type);
    clearResumeState(hash);
    onProgress?.(100);

    return mergeResult;
}

// ─────────── API 方法 ───────────

async function checkFile(hash: string, filename: string): Promise<CheckFileResult> {
    const res = await httpClient.post<{ data: CheckFileResult }>('/upload/check', { hash, filename });
    return res.data.data;
}

async function mergeChunks(
    hash: string,
    total: number,
    filename: string,
    type: 'video' | 'image' = 'video'
): Promise<UploadResponse> {
    const res = await httpClient.post<{ data: UploadResponse }>('/upload/merge', { hash, total, filename, type });
    return res.data.data;
}

/**
 * 文件上传服务
 */
export const uploadService = {
    /**
     * 上传单个文件（原有功能，保留不变）
     */
    async uploadFile(
        file: File,
        type: 'video' | 'image' = 'video',
        options?: UploadOptions
    ): Promise<UploadResponse> {
        const formData = new FormData();
        formData.append(type, file);

        const config: AxiosRequestConfig = {
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                if (options?.onProgress && progressEvent.total) {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    options.onProgress(percentCompleted);
                }
            },
            signal: options?.abortSignal,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const endpoint = type === 'video' ? '/upload/video' : '/upload/image';
        const response = await httpClient.post<{ data: UploadResponse }>(
            endpoint,
            formData,
            config
        );

        return response.data.data;
    },

    /**
     * 分片上传单个文件（含秒传、断点续传）
     */
    uploadFileInChunks,

    /**
     * 批量上传文件 - 多请求（原有功能，保留不变）
     */
    async uploadMultiple(
        files: File[],
        options?: UploadOptions
    ): Promise<string[]> {
        const formData = new FormData();
        files.forEach((file) => formData.append('files', file));

        const response = await httpClient.post<{ data: { urls: string[] } }>(
            '/upload/multiple',
            formData,
            {
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    if (options?.onProgress && progressEvent.total) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        options.onProgress(percentCompleted);
                    }
                },
                signal: options?.abortSignal,
            }
        );

        return response.data.data.urls;
    },
};

export default uploadService;
