import { useCallback, useRef, useState } from 'react';

export const useVideoPreview = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovering, setIsHovering] = useState(false);

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
        isHovering,
        handleMouseEnter,
        handleMouseLeave,
        handleCanPlay,
    };
};
