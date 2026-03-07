import { useCallback, useRef, useState } from 'react';
import { uploadService } from '@repo/api';
import { UploadTask, UseUploadOptions, UploadStatus } from '@repo/shared-types';
import { validateFileSize, validateFileType, genId } from '@repo/utils';

/**
 * 视频上传管理 Hook
 * 处理文件选择、分片上传、进度追踪及取消上传
 */
export const useUpload = ({ value, onChange, maxCount, chunkThreshold }: UseUploadOptions) => {
  const [tasks, setTasks] = useState<UploadTask[]>([]);
  const tasksRef = useRef<UploadTask[]>([]);
  const abortMapRef = useRef<Map<string, AbortController>>(new Map());

  /**
   * 更新特定任务的状态
   * @param id 任务 ID
   * @param patch 更新的字段
   */
  const updateTask = useCallback((id: string, patch: Partial<UploadTask>) => {
    setTasks(prev => {
      const next = prev.map(t => (t.id === id ? { ...t, ...patch } : t));
      tasksRef.current = next;
      return next;
    });
  }, []);

  /**
   * 校验上传文件
   * 限制 100MB 以内，格式仅支持 MP4/MOV
   */
  const validateFile = useCallback((file: File): string | null => {
    const sizeError = validateFileSize(file, 100 * 1024 * 1024);
    if (sizeError) return sizeError;

    const typeError = validateFileType(file, ['video/mp4', 'video/quicktime']);
    if (typeError) return typeError;

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
