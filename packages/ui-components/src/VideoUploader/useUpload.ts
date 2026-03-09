import { useCallback, useRef, useState } from 'react';
import { uploadService } from '@repo/api';
import { UploadStatus } from '@repo/shared-types';
import { validateFileSize, validateFileType, genId } from '@repo/utils';

/**
 * 单个上传任务的状态定义
 */
interface UploadTask {
  /** 任务唯一标识 */
  id: string;
  /** 原始文件对象 */
  file: File;
  /** 当前上传状态 */
  status: UploadStatus;
  /** 上传进度 (0-100) */
  progress: number;
  /** 错误信息 */
  errorMsg?: string;
  /** 分片上传辅助信息 */
  chunkInfo?: string;
  /** 用于取消请求的控制器 */
  abortController: AbortController;
}

/**
 * useUpload Hook 的配置项
 */
interface UseUploadHookOptions {
  /** 已上传的 URL 列表 */
  value: string[];
  /** 当上传列表发生变化时的回调 */
  onChange?: (urls: string[]) => void;
  /** 最大允许上传数量 */
  maxCount: number;
  /** 启用分片上传的阈值 (字节) */
  chunkThreshold: number;
}

/**
 * 视频上传管理 Hook
 * 处理文件选择、校验、分片/直接上传、进度追踪、暂停、重试及取消
 */
export const useUpload = ({ value, onChange, maxCount, chunkThreshold }: UseUploadHookOptions) => {
  /** 正在进行的上传任务列表状态 */
  const [tasks, setTasks] = useState<UploadTask[]>([]);
  /** 任务列表的引用，用于在闭包中获取最新状态 */
  const tasksRef = useRef<UploadTask[]>([]);
  /** 存储每个任务的取消控制器 */
  const abortMapRef = useRef<Map<string, AbortController>>(new Map());

  /**
   * 更新特定任务的状态或进度
   */
  const updateTask = useCallback((id: string, patch: Partial<UploadTask>) => {
    setTasks(prev => {
      const next = prev.map(t => (t.id === id ? { ...t, ...patch } : t));
      tasksRef.current = next;
      return next;
    });
  }, []);

  /**
   * 校验上传文件的大小和格式
   */
  const validateFile = useCallback((file: File): string | null => {
    const sizeError = validateFileSize(file, 100 * 1024 * 1024);
    if (sizeError) return sizeError;

    const typeError = validateFileType(file, ['video/mp4', 'video/quicktime']);
    if (typeError) return typeError;

    return null;
  }, []);

  /**
   * 处理上传成功后的逻辑
   */
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

  /**
   * 处理上传失败后的错误显示
   */
  const handleError = useCallback((id: string, error: any) => {
    if (error?.name === 'AbortError' || error?.name === 'CanceledError') return;
    const errorMsg = error?.response?.data?.message || error?.message || '上传失败，请重试';
    updateTask(id, { status: 'ERROR', errorMsg });
  }, [updateTask]);

  /**
   * 执行普通文件直传
   */
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

  /**
   * 执行大文件分片上传 (含秒传和断点续传)
   */
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

  /**
   * 将文件加入上传队列并开始执行
   */
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

  /**
   * 批量处理选择的文件
   */
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

  /**
   * 取消指定的上传任务
   */
  const cancelUpload = useCallback((id: string) => {
    abortMapRef.current.get(id)?.abort();
    abortMapRef.current.delete(id);
    setTasks(prev => {
      const next = prev.filter(t => t.id !== id);
      tasksRef.current = next;
      return next;
    });
  }, []);

  /**
   * 暂停指定的上传任务
   */
  const pauseUpload = useCallback((id: string) => {
    abortMapRef.current.get(id)?.abort();
    updateTask(id, { status: 'PAUSED' });
  }, [updateTask]);

  /**
   * 恢复被暂停的上传任务
   */
  const resumeUpload = useCallback((id: string) => {
    const task = tasksRef.current.find(t => t.id === id);
    if (!task) return;

    const newAbort = new AbortController();
    abortMapRef.current.set(id, newAbort);
    updateTask(id, { status: 'HASHING', progress: 0, abortController: newAbort });
    startChunkUpload(id, task.file, newAbort);
  }, [startChunkUpload, updateTask]);

  /**
   * 重试上传失败的任务
   */
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

  /** 当前所有活动中的视频总数 (已成功 + 上传中) */
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
