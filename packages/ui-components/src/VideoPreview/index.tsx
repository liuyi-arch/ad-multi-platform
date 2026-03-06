import React from 'react';
import { useVideoPreview } from './useVideoPreview';

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
    const {
        videoRef,
        isHovering,
        handleMouseEnter,
        handleMouseLeave,
        handleCanPlay,
    } = useVideoPreview();

    const hasVideo = !!videoUrl;
    const shouldShowVideo = hasVideo && (isHovering || !posterUrl);

    return (
        <div
            className={`relative overflow-hidden bg-slate-100 ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ cursor: onClick ? 'pointer' : undefined }}
        >
            {/* 封面图 */}
            {posterUrl && (
                <img
                    src={posterUrl}
                    alt="preview"
                    className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${isHovering && hasVideo ? 'opacity-0' : 'opacity-100'}`}
                />
            )}

            {/* 视频层 */}
            {hasVideo && (
                <video
                    ref={videoRef}
                    src={videoUrl}
                    className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${shouldShowVideo ? 'opacity-100' : 'opacity-0'}`}
                    muted
                    playsInline
                    loop
                    preload="metadata"
                    poster={posterUrl || undefined}
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
            {!posterUrl && !hasVideo && (
                <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-300 text-2xl">image</span>
                </div>
            )}
        </div>
    );
};

export default VideoPreview;
