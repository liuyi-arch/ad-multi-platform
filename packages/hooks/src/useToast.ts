import { useState, useEffect, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
    id: number;
    message: string;
    type: ToastType;
    duration: number;
}

// Singleton controller
let toastIdCounter = 0;
const subscribers = new Set<(toasts: ToastItem[]) => void>();
let activeToasts: ToastItem[] = [];

export const toast = {
    show: (message: string, type: ToastType = 'info', duration: number = 3000) => {
        const id = ++toastIdCounter;
        activeToasts = [...activeToasts, { id, message, type, duration }];
        subscribers.forEach(fn => fn(activeToasts));
    },
    success: (msg: string) => toast.show(msg, 'success'),
    error: (msg: string) => toast.show(msg, 'error'),
    info: (msg: string) => toast.show(msg, 'info'),
    warning: (msg: string) => toast.show(msg, 'warning'),

    _subscribe: (fn: (toasts: ToastItem[]) => void) => {
        subscribers.add(fn);
        return () => { subscribers.delete(fn); };
    },
    _remove: (id: number) => {
        activeToasts = activeToasts.filter(t => t.id !== id);
        subscribers.forEach(fn => fn(activeToasts));
    }
};

export const useToast = () => {
    return toast;
};
