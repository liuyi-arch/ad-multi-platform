import { useState, useEffect, useCallback } from 'react';
import { toast, ToastItem as HookToastItem } from '@repo/hooks';

export function useToast() {
    const [toasts, setToasts] = useState<HookToastItem[]>([]);

    useEffect(() => {
        return toast._subscribe(setToasts);
    }, []);

    const removeToast = useCallback((id: number) => {
        toast._remove(id);
    }, []);

    return { toasts, removeToast };
}