import React, { useRef, useState } from 'react';

export interface VideoPreviewProps {
    /** 视频 URL */
    videoUrl?: string;
    /** 封面图 URL（静态缩略图） */
    posterUrl?: string;
    /** 自定义 className */
    className?: string;
    /** 点击回调 */
    onClick?: () => void;
}

/**
 * 可复用的视频预览组件
 * 默认显示封面图，鼠标悬停时自动播放视频，移出时暂停并重置。
 */
export const VideoPreview: React.FC<VideoPreviewProps> = ({
    videoUrl,
    posterUrl,
    className = '',
    onClick,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    const resolveUrl = (url?: string) => {
        if (!url) return '';
        return url.startsWith('http') ? url : `http://localhost:3000${url}`;
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
        const video = videoRef.current;
        if (video && video.readyState >= 2) {
            video.play().catch(() => { });
        }
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        const video = videoRef.current;
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    };

    // 视频加载就绪后，如果仍在 hover 则立即播放
    const handleCanPlay = () => {
        if (isHovering && videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    };

    const resolvedPoster = resolveUrl(posterUrl);
    const resolvedVideo = resolveUrl(videoUrl);
    const hasVideo = !!resolvedVideo;

    return (
        <div
            className={`relative overflow-hidden bg-slate-100 ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ cursor: onClick ? 'pointer' : undefined }}
        >
            {/* 封面图 */}
            {resolvedPoster && (
                <img
                    src={resolvedPoster}
                    alt="preview"
                    className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${isHovering && hasVideo ? 'opacity-0' : 'opacity-100'}`}
                />
            )}

            {/* 视频层 */}
            {hasVideo && (
                <video
                    ref={videoRef}
                    src={resolvedVideo}
                    className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
                    muted
                    playsInline
                    loop
                    preload="metadata"
                    onCanPlay={handleCanPlay}
                />
            )}

            {/* 播放图标提示 */}
            {hasVideo && !isHovering && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/30 rounded-full p-1 backdrop-blur-sm">
                        <span className="material-symbols-outlined text-white text-sm">play_arrow</span>
                    </div>
                </div>
            )}

            {/* 无封面图且无视频时的占位 */}
            {!resolvedPoster && !hasVideo && (
                <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-300 text-2xl">image</span>
                </div>
            )}
        </div>
    );
};

export default VideoPreview;
