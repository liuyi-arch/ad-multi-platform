import { useCallback, useRef, useState } from 'react';
import { useIntersectionObserver } from '@repo/hooks';

export const useVideoPreview = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    // 监听视口交叉
    const { elementRef, isVisible } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true // 一旦可见就停止监听，保持预加载状态
    });

    const handleMouseEnter = useCallback(() => {
        setIsHovering(true);
        const video = videoRef.current;
        if (video && video.readyState >= 2) {
            video.play().catch(() => { });
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false);
        const video = videoRef.current;
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    }, []);

    const handleCanPlay = useCallback(() => {
        if (isHovering && videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    }, [isHovering]);

    return {
        videoRef,
        containerRef: elementRef,
        isVisible,
        isHovering,
        handleMouseEnter,
        handleMouseLeave,
        handleCanPlay,
    };
};
