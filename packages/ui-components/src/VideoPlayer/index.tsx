
import React from 'react';

export interface VideoPlayerProps {
  imageUrl: string;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ imageUrl, className = "" }) => {
  return (
    <div className={`relative aspect-video bg-black rounded-xl overflow-hidden shadow-sm group ${className}`}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${imageUrl}")` }}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <button className="size-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-4xl fill-1">play_arrow</span>
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex flex-col gap-2">
          <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-1/3"></div>
          </div>
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl">play_circle</span>
              <span className="text-xs font-medium tabular-nums">01:12 / 03:45</span>
            </div>
            <span className="material-symbols-outlined text-2xl">fullscreen</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
