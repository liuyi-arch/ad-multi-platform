import { useCallback, useRef, useState } from 'react';
import { uploadService } from '@repo/api';

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

const genId = () => Math.random().toString(36).substring(2, 9);

export const useUpload = ({ value, onChange, maxCount, chunkThreshold }: UseUploadOptions) => {
  const [tasks, setTasks] = useState<UploadTask[]>([]);
  const tasksRef = useRef<UploadTask[]>([]);
  const abortMapRef = useRef<Map<string, AbortController>>(new Map());

  const updateTask = useCallback((id: string, patch: Partial<UploadTask>) => {
    setTasks(prev => {
      const next = prev.map(t => (t.id === id ? { ...t, ...patch } : t));
      tasksRef.current = next;
      return next;
    });
  }, []);

  const validateFile = useCallback((file: File): string | null => {
    if (file.size > 100 * 1024 * 1024) return `文件 ${file.name} 超过 100MB`;
    if (!['video/mp4', 'video/quicktime'].includes(file.type)) {
      return `文件 ${file.name} 格式不支持（仅支持 MP4, MOV）`;
    }
    return null;
  }, []);

  const handleSuccess = useCallback((id: string, url: string) => {
    updateTask(id, { status: 'SUCCESS', progress: 100 });
    setTimeout(() => {
      setTasks(prev => {
        const next = prev.filter(t => t.id !== id);
        tasksRef.current = next;
        return next;
      });
      onChange?.([...value, url]);
    }, 800);
  }, [onChange, updateTask, value]);

  const handleError = useCallback((id: string, error: any) => {
    if (error?.name === 'AbortError' || error?.name === 'CanceledError') {
      return;
    }
    const errorMsg = error?.response?.data?.message || error?.message || '上传失败，请重试';
    updateTask(id, { status: 'ERROR', errorMsg });
  }, [updateTask]);

  const startDirectUpload = useCallback(async (id: string, file: File, abortController: AbortController) => {
    updateTask(id, { status: 'UPLOADING' });
    try {
      const result = await uploadService.uploadFile(file, 'video', {
        onProgress: (progress) => updateTask(id, { progress }),
        abortSignal: abortController.signal,
      });
      handleSuccess(id, result.url);
    } catch (error: any) {
      handleError(id, error);
    }
  }, [handleError, handleSuccess, updateTask]);

  const startChunkUpload = useCallback(async (id: string, file: File, abortController: AbortController) => {
    updateTask(id, { status: 'HASHING', progress: 0 });
    try {
      const result = await uploadService.uploadFileInChunks(file, 'video', {
        abortSignal: abortController.signal,
        onProgress: (progress) => {
          const status: UploadStatus = progress > 0 ? 'UPLOADING' : 'HASHING';
          updateTask(id, { status, progress });
        },
      });
      handleSuccess(id, result.url);
    } catch (error: any) {
      handleError(id, error);
    }
  }, [handleError, handleSuccess, updateTask]);

  const queueUpload = useCallback((file: File) => {
    const id = genId();
    const abortController = new AbortController();
    abortMapRef.current.set(id, abortController);

    const task: UploadTask = {
      id,
      file,
      status: 'PENDING',
      progress: 0,
      abortController,
    };

    setTasks(prev => {
      const next = [...prev, task];
      tasksRef.current = next;
      return next;
    });

    if (file.size > chunkThreshold) {
      startChunkUpload(id, file, abortController);
    } else {
      startDirectUpload(id, file, abortController);
    }
  }, [chunkThreshold, startChunkUpload, startDirectUpload]);

  const handleFilesSelect = useCallback((files: File[]) => {
    if (!files.length) return;

    const currentTotal = value.length + tasksRef.current.filter(t => t.status !== 'ERROR').length;
    if (currentTotal + files.length > maxCount) {
      alert(`最多只能上传 ${maxCount} 个视频`);
      return;
    }

    for (const file of files) {
      const err = validateFile(file);
      if (err) {
        alert(err);
        continue;
      }
      queueUpload(file);
    }
  }, [maxCount, queueUpload, validateFile, value.length]);

  const cancelUpload = useCallback((id: string) => {
    abortMapRef.current.get(id)?.abort();
    abortMapRef.current.delete(id);
    setTasks(prev => {
      const next = prev.filter(t => t.id !== id);
      tasksRef.current = next;
      return next;
    });
  }, []);

  const pauseUpload = useCallback((id: string) => {
    abortMapRef.current.get(id)?.abort();
    updateTask(id, { status: 'PAUSED' });
  }, [updateTask]);

  const resumeUpload = useCallback((id: string) => {
    const task = tasksRef.current.find(t => t.id === id);
    if (!task) return;

    const newAbort = new AbortController();
    abortMapRef.current.set(id, newAbort);
    updateTask(id, { status: 'HASHING', progress: 0, abortController: newAbort });
    startChunkUpload(id, task.file, newAbort);
  }, [startChunkUpload, updateTask]);

  const retryUpload = useCallback((id: string) => {
    const task = tasksRef.current.find(t => t.id === id);
    if (!task) return;

    const newAbort = new AbortController();
    abortMapRef.current.set(id, newAbort);
    updateTask(id, {
      status: 'PENDING',
      progress: 0,
      errorMsg: undefined,
      abortController: newAbort,
    });

    if (task.file.size > chunkThreshold) {
      startChunkUpload(id, task.file, newAbort);
    } else {
      startDirectUpload(id, task.file, newAbort);
    }
  }, [chunkThreshold, startChunkUpload, startDirectUpload, updateTask]);

  const activeCount = value.length + tasks.filter(t => t.status !== 'ERROR').length;

  return {
    tasks,
    activeCount,
    handleFilesSelect,
    cancelUpload,
    pauseUpload,
    resumeUpload,
    retryUpload,
  };
};
