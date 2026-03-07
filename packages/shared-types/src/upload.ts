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

export type UploadStatus =
  | 'PENDING'
  | 'HASHING'
  | 'UPLOADING'
  | 'PAUSED'
  | 'ERROR'
  | 'SUCCESS';
