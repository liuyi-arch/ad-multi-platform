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
    cancelToken?: any; // Generic token for cancellation
    abortSignal?: AbortSignal;
}

/**
 * 文件上传服务
 */
export const uploadService = {
    /**
     * 上传单个文件
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
     * 批量上传文件 (示例)
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
