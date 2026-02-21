import React, { useState, useRef, useEffect } from 'react';

export interface VideoPlayerProps {
  imageUrl: string; // 这里的 imageUrl 实际作为视频源使用
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ imageUrl, className = "" }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fullUrl = imageUrl && !imageUrl.startsWith('http') ? `http://localhost:3000${imageUrl}` : imageUrl;

  // 格式化时间
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // 切换播放/暂停
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.error("Play failed:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 更新进度
  const handleTimeUpdate = () => {
    if (videoRef.current && !isDragging) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // 加载元数据获取时长
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // 进度拖动中 (仅更新显示)
  const handleSeekInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDragging(true);
    setCurrentTime(Number(e.target.value));
  };

  // 进度跳转完成 (更新实际播放位置)
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
    setIsDragging(false);
  };

  // 切换全屏
  const toggleFullScreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  // 监听全屏变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // 自动隐藏控制栏
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (isPlaying && showControls) {
      timeoutId = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [isPlaying, showControls]);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-video bg-black rounded-xl overflow-hidden shadow-lg group ${className}`}
      onMouseMove={() => setShowControls(true)}
      onClick={(e) => {
        if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === 'VIDEO') {
          togglePlay();
        }
      }}
    >
      <video
        ref={videoRef}
        src={fullUrl}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={togglePlay}
        playsInline
      />

      {/* 渐变遮罩 */}
      <div className={`absolute inset-0 bg-black/20 pointer-events-none transition-opacity duration-300 ${isPlaying && !showControls ? 'opacity-0' : 'opacity-100'}`} />

      {/* 中间播放按钮 */}
      {(!isPlaying || showControls) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <button
            className="size-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:scale-110 transition-transform pointer-events-auto shadow-xl"
            onClick={(e) => { e.stopPropagation(); togglePlay(); }}
          >
            <span className="material-symbols-outlined text-4xl fill-1">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
        </div>
      )}

      {/* 底部控制栏 */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-transform duration-500 flex flex-col gap-3 ${showControls ? 'translate-y-0' : 'translate-y-full'}`}>

        {/* 进度条 */}
        <div className="relative group/progress h-1.5 w-full flex items-center">
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onInput={handleSeekInput}
            onChange={handleSeekChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary relative transition-all duration-100"
              style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 size-3 bg-white rounded-full shadow-md scale-0 group-hover/progress:scale-100 transition-transform" />
            </div>
          </div>
        </div>

        {/* 控制项 */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="hover:text-primary transition-colors flex items-center">
              <span className="material-symbols-outlined text-2xl">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>

            <div className="flex items-center gap-2 text-xs font-bold tabular-nums tracking-wider opacity-90">
              <span>{formatTime(currentTime)}</span>
              <span className="opacity-40">/</span>
              <span className="opacity-60">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="relative">
              <button
                className="text-xs font-bold px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 transition-all border border-white/10"
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              >
                {playbackRate === 1 ? '倍速' : `${playbackRate}x`}
              </button>

              {showSpeedMenu && (
                <div className="absolute bottom-full mb-2 right-0 bg-[#1e293b] border border-slate-700 rounded-lg overflow-hidden shadow-2xl min-w-[80px] z-50">
                  {[0.5, 1, 1.5, 2].map(speed => (
                    <button
                      key={speed}
                      className={`w-full px-4 py-2 text-xs text-left hover:bg-primary transition-colors ${playbackRate === speed ? 'text-primary bg-primary/10' : 'text-slate-300'}`}
                      onClick={() => {
                        setPlaybackRate(speed);
                        if (videoRef.current) videoRef.current.playbackRate = speed;
                        setShowSpeedMenu(false);
                      }}
                    >
                      {speed === 1 ? '正常' : `${speed}x`}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.muted = !videoRef.current.muted;
                }
              }}
              className="hover:text-primary transition-colors flex items-center"
            >
              <span className="material-symbols-outlined text-2xl">volume_up</span>
            </button>

            <button onClick={toggleFullScreen} className="hover:text-primary transition-colors flex items-center">
              <span className="material-symbols-outlined text-2xl">
                {isFullScreen ? 'fullscreen_exit' : 'fullscreen'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
