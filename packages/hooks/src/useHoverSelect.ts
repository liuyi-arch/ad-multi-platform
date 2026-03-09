import { useState, useRef, useCallback } from 'react';

export interface UseHoverSelectOptions {
    delay?: number;
}

export const useHoverSelect = (options: UseHoverSelectOptions = {}) => {
    const { delay = 200 } = options;
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<any>(null);

    const onMouseEnter = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsOpen(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, delay);
    }, [delay]);

    const close = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsOpen(false);
    }, []);

    return {
        isOpen,
        setIsOpen,
        onMouseEnter,
        onMouseLeave,
        close
    };
};
