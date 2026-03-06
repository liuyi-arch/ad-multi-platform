import React, { useRef } from 'react';
import { useUpload, UploadStatus } from './useUpload';

// ─────────── Props ───────────
export interface VideoUploaderProps {
  value?: string[];
  onChange?: (urls: string[]) => void;
  label?: string;
  className?: string;
  maxCount?: number;
  /** 单文件大于此值（字节）时启用分片上传，默认 5MB */
  chunkThreshold?: number;
}

// ─────────── 常量 ───────────
const DEFAULT_CHUNK_THRESHOLD = 5 * 1024 * 1024; // 5MB

// ─────────── 状态标签配置 ───────────
const STATUS_CONFIG: Record<UploadStatus, { label: string; color: string; icon: string }> = {
  PENDING: { label: '等待', color: '#64748b', icon: 'schedule' },
  HASHING: { label: '解析中', color: '#f59e0b', icon: 'fingerprint' },
  UPLOADING: { label: '传输中', color: '#3b82f6', icon: 'cloud_upload' },
  PAUSED: { label: '已暂停', color: '#f97316', icon: 'pause_circle' },
  ERROR: { label: '失败', color: '#ef4444', icon: 'error' },
  SUCCESS: { label: '成功', color: '#22c55e', icon: 'check_circle' },
};

// ─────────────────────────────────────────────
export const VideoUploader: React.FC<VideoUploaderProps> = ({
  value = [],
  onChange,
  label = '上传视频',
  className = '',
  maxCount = 3,
  chunkThreshold = DEFAULT_CHUNK_THRESHOLD,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    tasks,
    activeCount,
    handleFilesSelect,
    cancelUpload,
    pauseUpload,
    resumeUpload,
    retryUpload,
  } = useUpload({
    value,
    onChange,
    maxCount,
    chunkThreshold,
  });

  // ─── 移除已完成视频 ───
  const removeVideo = (index: number) => {
    const newUrls = [...value];
    newUrls.splice(index, 1);
    onChange?.(newUrls);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFilesSelect(files);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ─────────────────────────── 渲染 ───────────────────────────
  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-bold text-[#1e293b]">{label}</label>
      <div className="flex flex-wrap gap-4">

        {/* ── 已上传完成的视频 ── */}
        {value.map((url, index) => (
          <div
            key={index}
            className="w-24 h-24 rounded-xl relative overflow-hidden border border-slate-200 shadow-sm group"
          >
            <div className="w-full h-full bg-slate-900 flex items-center justify-center">
              {url ? (
                <video
                  src={url}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  onMouseOver={e => {
                    const v = e.target as HTMLVideoElement;
                    if (v.readyState >= 2) v.play().catch(() => { });
                  }}
                  onMouseOut={e => {
                    const v = e.target as HTMLVideoElement;
                    v.pause(); v.currentTime = 0;
                  }}
                />
              ) : (
                <span className="material-symbols-outlined text-slate-400">movie</span>
              )}
            </div>
            {/* 成功标签 */}
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

        {/* ── 上传任务列表 ── */}
        {tasks.map(task => {
          const cfg = STATUS_CONFIG[task.status];
          const isPaused = task.status === 'PAUSED';
          const isError = task.status === 'ERROR';
          const isUploading = task.status === 'UPLOADING';
          const isHashing = task.status === 'HASHING';

          return (
            <div
              key={task.id}
              className="w-24 h-24 rounded-xl relative overflow-hidden border group"
              style={{ borderColor: cfg.color + '60', background: '#0f172a' }}
            >
              {/* 进度背景填充 */}
              {(isUploading || isHashing) && (
                <div
                  className="absolute bottom-0 left-0 w-full transition-all duration-300"
                  style={{
                    height: `${task.progress}%`,
                    backgroundColor: cfg.color,
                    opacity: 0.25,
                  }}
                />
              )}

              {/* 中心内容 */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full gap-1 px-1">
                <span
                  className="material-symbols-outlined text-xl"
                  style={{ color: cfg.color }}
                >
                  {cfg.icon}
                </span>
                <p className="text-[10px] font-bold text-white leading-tight text-center">
                  {isUploading ? `${task.progress}%` : cfg.label}
                </p>
                {task.chunkInfo && (
                  <p className="text-[9px] text-slate-400 leading-tight">{task.chunkInfo}</p>
                )}
                {isError && task.errorMsg && (
                  <p className="text-[8px] text-red-400 leading-tight text-center line-clamp-2">
                    {task.errorMsg}
                  </p>
                )}
              </div>

              {/* 操作按钮层（悬浮显示）*/}
              <div className="absolute top-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                {/* 暂停（上传中可暂停）*/}
                {isUploading && (
                  <button
                    onClick={() => pauseUpload(task.id)}
                    title="暂停"
                    className="bg-black/50 hover:bg-black/70 text-white rounded-full p-0.5 flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-[14px]">pause</span>
                  </button>
                )}
                {/* 继续（暂停中可继续）*/}
                {isPaused && (
                  <button
                    onClick={() => resumeUpload(task.id)}
                    title="继续上传"
                    className="bg-black/50 hover:bg-black/70 text-white rounded-full p-0.5 flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                  </button>
                )}
                {/* 重试（失败可重试）*/}
                {isError && (
                  <button
                    onClick={() => retryUpload(task.id)}
                    title="重试"
                    className="bg-black/50 hover:bg-black/70 text-white rounded-full p-0.5 flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-[14px]">refresh</span>
                  </button>
                )}
                {/* 取消（任何状态可取消/移除）*/}
                <button
                  onClick={() => cancelUpload(task.id)}
                  title="取消"
                  className="bg-black/50 hover:bg-black/70 text-white rounded-full p-0.5 flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>

              {/* 哈希中旋转动效 */}
              {isHashing && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div
                    className="w-10 h-10 rounded-full border-2 border-transparent animate-spin"
                    style={{ borderTopColor: cfg.color, opacity: 0.6 }}
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* ── 上传按钮 ── */}
        {activeCount < maxCount && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center hover:border-[#135bec] hover:bg-blue-50 transition-all text-slate-400 hover:text-[#135bec]"
          >
            <span className="material-symbols-outlined text-2xl mb-1">add</span>
            <p className="text-[10px] font-bold">上传</p>
          </button>
        )}
      </div>

      {/* 隐藏 File Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="video/mp4,video/quicktime"
        multiple
        onChange={handleFileSelect}
      />

      {/* 状态图例 */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
        {Object.entries(STATUS_CONFIG).filter(([k]) => k !== 'SUCCESS').map(([key, cfg]) => (
          <span key={key} className="flex items-center gap-1 text-[10px] text-slate-400">
            <span className="material-symbols-outlined text-[12px]" style={{ color: cfg.color }}>
              {cfg.icon}
            </span>
            {cfg.label}
          </span>
        ))}
      </div>

      <p className="text-xs text-slate-400 mt-1">
        支持 MP4, MOV 格式，单视频最大 100MB，最多 {maxCount} 个。
        大于 {Math.round(chunkThreshold / 1024 / 1024)}MB 自动分片上传，支持断点续传与秒传。
      </p>
    </div>
  );
};

export default VideoUploader;
