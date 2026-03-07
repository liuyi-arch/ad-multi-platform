import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
    id: number;
    message: string;
    type: ToastType;
    duration: number;
}

interface ToastState {
    toasts: ToastItem[];
    show: (message: string, type?: ToastType, duration?: number) => void;
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
    warning: (message: string) => void;
    remove: (id: number) => void;
}

let count = 0;

export const useToastStore = create<ToastState>((set, get) => ({
    toasts: [],
    show: (message, type = 'info', duration = 3000) => {
        const id = ++count;
        set((state) => ({
            toasts: [...state.toasts, { id, message, type, duration }]
        }));
    },
    success: (message) => get().show(message, 'success'),
    error: (message) => get().show(message, 'error'),
    info: (message) => get().show(message, 'info'),
    warning: (message) => get().show(message, 'warning'),
    remove: (id) => set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id)
    })),
}));

// 为了保持与原有 API 的兼容性，导出 toast 对象
export const toast = {
    show: (message: string, type: ToastType = 'info', duration: number = 3000) => 
        useToastStore.getState().show(message, type, duration),
    success: (message: string) => useToastStore.getState().show(message, 'success'),
    error: (message: string) => useToastStore.getState().show(message, 'error'),
    info: (message: string) => useToastStore.getState().show(message, 'info'),
    warning: (message: string) => useToastStore.getState().show(message, 'warning'),
};
