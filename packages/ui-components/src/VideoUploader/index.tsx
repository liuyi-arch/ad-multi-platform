import React, { useState, useRef } from 'react';
import { uploadService } from '@repo/api';

export interface VideoUploaderProps {
  value?: string[]; // 已上传视频的 URL 列表
  onChange?: (urls: string[]) => void;
  label?: string;
  className?: string;
  maxCount?: number;
}

interface UploadTask {
  id: string;
  file: File;
  progress: number;
  abortController: AbortController;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({
  value = [],
  onChange,
  label = "上传视频",
  className = "",
  maxCount = 3
}) => {
  const [uploadingTasks, setUploadingTasks] = useState<UploadTask[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // 校验数量
    if (value.length + uploadingTasks.length + files.length > maxCount) {
      alert(`最多只能上传 ${maxCount} 个视频`);
      return;
    }

    files.forEach(file => {
      // 校验大小 (100MB)
      if (file.size > 100 * 1024 * 1024) {
        alert(`文件 ${file.name} 超过 100MB`);
        return;
      }
      // 校验格式
      if (!['video/mp4', 'video/quicktime'].includes(file.type)) {
        alert(`文件 ${file.name} 格式不支持 (仅支持 MP4, MOV)`);
        return;
      }

      startUpload(file);
    });

    // 重置 input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const startUpload = async (file: File) => {
    const abortController = new AbortController();
    const taskId = Math.random().toString(36).substring(7);

    const newTask: UploadTask = {
      id: taskId,
      file,
      progress: 0,
      abortController
    };

    setUploadingTasks(prev => [...prev, newTask]);

    try {
      const result = await uploadService.uploadFile(file, 'video', {
        onProgress: (progress) => {
          setUploadingTasks(prev =>
            prev.map(t => t.id === taskId ? { ...t, progress } : t)
          );
        },
        abortSignal: abortController.signal
      });

      // 上传成功
      const newUrls = [...value, result.url];
      onChange?.(newUrls);
      setUploadingTasks(prev => prev.filter(t => t.id !== taskId));
    } catch (error: any) {
      if (error.name === 'CanceledError' || error.name === 'AbortError') {
        console.log('Upload canceled:', file.name);
      } else {
        console.error('Upload failed:', error);
        alert(`文件 ${file.name} 上传失败`);
      }
      setUploadingTasks(prev => prev.filter(t => t.id !== taskId));
    }
  };

  const cancelUpload = (taskId: string) => {
    const task = uploadingTasks.find(t => t.id === taskId);
    if (task) {
      task.abortController.abort();
      setUploadingTasks(prev => prev.filter(t => t.id !== taskId));
    }
  };

  const removeVideo = (index: number) => {
    const newUrls = [...value];
    newUrls.splice(index, 1);
    onChange?.(newUrls);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-bold text-[#1e293b]">{label}</label>
      <div className="flex flex-wrap gap-4">
        {/* 已经上传完成的视频 */}
        {value.map((url, index) => (
          <div key={index} className="w-24 h-24 rounded-xl relative overflow-hidden border border-slate-200 shadow-sm group">
            <div className="w-full h-full bg-slate-900 flex items-center justify-center">
              {url ? (
                <video
                  src={url.startsWith('http') ? url : `http://localhost:3000${url}`}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  onMouseOver={e => {
                    const v = e.target as HTMLVideoElement;
                    if (v.readyState >= 2) {
                      v.play().catch(() => { });
                    }
                  }}
                  onMouseOut={e => {
                    const v = e.target as HTMLVideoElement;
                    v.pause();
                    v.currentTime = 0;
                  }}
                  onError={(e) => {
                    console.error('Video preview error:', e);
                  }}
                />
              ) : (
                <span className="material-symbols-outlined text-slate-400">movie</span>
              )}
            </div>
            {/* 成功图标 */}
            <div className="absolute top-1 left-1 bg-green-500 text-white rounded-full p-0.5 flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[12px] font-bold">check</span>
            </div>
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* 移除按钮 */}
            <button
              onClick={() => removeVideo(index)}
              className="absolute top-1 right-1 bg-white/90 hover:bg-white text-slate-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        ))}

        {/* 正在上传中的视频 */}
        {uploadingTasks.map(task => (
          <div key={task.id} className="w-24 h-24 rounded-xl bg-slate-800 flex flex-col items-center justify-center relative overflow-hidden border border-slate-600">
            <div className="relative z-10 flex flex-col items-center">
              <span className="material-symbols-outlined text-slate-400 text-xl mb-1 animate-pulse">movie</span>
              <p className="text-[10px] text-white font-bold">{task.progress}%</p>
            </div>

            {/* 进度背景填充 */}
            <div className="absolute inset-0 bg-[#135bec]/20" />
            <div
              className="absolute bottom-0 left-0 w-full bg-[#135bec] transition-all duration-300"
              style={{ height: `${task.progress}%`, opacity: 0.6 }}
            />

            {/* 取消上传按钮 */}
            <button
              onClick={() => cancelUpload(task.id)}
              className="absolute top-1 right-1 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        ))}

        {/* 上传按钮 */}
        {value.length + uploadingTasks.length < maxCount && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center hover:border-[#135bec] hover:bg-blue-50 transition-all text-slate-400 hover:text-[#135bec]"
          >
            <span className="material-symbols-outlined text-2xl mb-1">add</span>
            <p className="text-[10px] font-bold">上传</p>
          </button>
        )}
      </div>

      {/* 隐藏的 File Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="video/mp4,video/quicktime"
        multiple
        onChange={handleFileSelect}
      />

      <p className="text-xs text-slate-400 mt-2">支持 MP4, MOV 格式，单视频最大 100MB，最多 {maxCount} 个</p>
    </div>
  );
};

export default VideoUploader;
