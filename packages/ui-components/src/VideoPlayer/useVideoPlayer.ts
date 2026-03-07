import { useState, useRef, useEffect, useCallback } from 'react';
import { formatTime as formatTimeUtil } from '@repo/utils';

export const useVideoPlayer = () => {
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

    // 格式化时间 - 使用抽离的工具函数
    const formatTime = useCallback((time: number) => {
        return formatTimeUtil(time);
    }, []);

    // 切换播放/暂停
    const togglePlay = useCallback(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play().catch(err => console.error("Play failed:", err));
            }
            setIsPlaying(!isPlaying);
        }
    }, [isPlaying]);

    // 更新进度
    const handleTimeUpdate = useCallback(() => {
        if (videoRef.current && !isDragging) {
            setCurrentTime(videoRef.current.currentTime);
        }
    }, [isDragging]);

    // 加载元数据获取时长
    const handleLoadedMetadata = useCallback(() => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    }, []);

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
    const toggleFullScreen = useCallback(() => {
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
    }, []);

    // 切换静音
    const toggleMute = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
        }
    }, []);

    // 设置播放速度
    const changePlaybackRate = (speed: number) => {
        setPlaybackRate(speed);
        if (videoRef.current) videoRef.current.playbackRate = speed;
        setShowSpeedMenu(false);
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

    return {
        videoRef,
        containerRef,
        isPlaying,
        currentTime,
        duration,
        playbackRate,
        showControls,
        isFullScreen,
        showSpeedMenu,
        setShowSpeedMenu,
        togglePlay,
        handleTimeUpdate,
        handleLoadedMetadata,
        handleSeekInput,
        handleSeekChange,
        toggleFullScreen,
        toggleMute,
        changePlaybackRate,
        formatTime,
        setShowControls,
        setIsPlaying,
    };
};
