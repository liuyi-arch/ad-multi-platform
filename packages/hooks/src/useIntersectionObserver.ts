import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
    threshold?: number | number[];
    root?: Element | null;
    rootMargin?: string;
    freezeOnceVisible?: boolean;
}

/**
 * 通用元素视口交叉检测 Hook
 */
export const useIntersectionObserver = ({
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
}: UseIntersectionObserverProps = {}) => {
    const [entry, setEntry] = useState<IntersectionObserverEntry>();
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<Element | null>(null);

    const frozen = isVisible && freezeOnceVisible;

    const updateEntry = ([newEntry]: IntersectionObserverEntry[]): void => {
        setEntry(newEntry);
        setIsVisible(newEntry.isIntersecting);
    };

    useEffect(() => {
        const node = elementRef.current;
        const hasIOSupport = !!window.IntersectionObserver;

        if (!hasIOSupport || frozen || !node) return;

        const observerParams = { threshold, root, rootMargin };
        const observer = new IntersectionObserver(updateEntry, observerParams);

        observer.observe(node);

        return () => observer.disconnect();
    }, [elementRef, threshold, root, rootMargin, frozen]);

    return { elementRef, isVisible, entry };
};
