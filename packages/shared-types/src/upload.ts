export type UploadStatus =
  | 'PENDING'
  | 'HASHING'
  | 'UPLOADING'
  | 'PAUSED'
  | 'ERROR'
  | 'SUCCESS';

export interface UploadTask {
  id: string;
  file: File;
  status: UploadStatus;
  progress: number;
  chunkInfo?: string;
  errorMsg?: string;
  abortController: AbortController;
}

export interface UseUploadOptions {
  value: string[];
  onChange?: (urls: string[]) => void;
  maxCount: number;
  chunkThreshold: number;
}
