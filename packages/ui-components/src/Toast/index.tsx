import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
    message: string;
    type?: ToastType;
    duration?: number;
    onClose: () => void;
}

const ToastItem: React.FC<ToastProps> = ({ message, type = 'info', duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for transition
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const typeConfig = {
        success: { icon: 'check_circle', color: 'bg-green-500', text: 'text-white' },
        error: { icon: 'error', color: 'bg-red-500', text: 'text-white' },
        info: { icon: 'info', color: 'bg-blue-500', text: 'text-white' },
        warning: { icon: 'warning', color: 'bg-orange-500', text: 'text-white' },
    };

    const config = typeConfig[type];

    return (
        <div
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl transition-all duration-300 transform font-bold ${config.color
                } ${config.text} ${isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95'}`}
        >
            <span className="material-symbols-outlined text-xl">{config.icon}</span>
            <span className="text-sm tracking-wide">{message}</span>
        </div>
    );
};

// Singleton controller for programmatically showing toasts
let toastIdCounter = 0;
const subscribers = new Set<(toasts: Array<{ id: number; message: string; type: ToastType; duration: number }>) => void>();
let activeToasts: Array<{ id: number; message: string; type: ToastType; duration: number }> = [];

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
};

export const ToastContainer: React.FC = () => {
    const [toasts, setToasts] = useState<Array<{ id: number; message: string; type: ToastType; duration: number }>>([]);

    useEffect(() => {
        const sub = (newToasts: typeof toasts) => setToasts(newToasts);
        subscribers.add(sub);
        return () => {
            subscribers.delete(sub);
        };
    }, []);

    const removeToast = useCallback((id: number) => {
        activeToasts = activeToasts.filter(t => t.id !== id);
        setToasts(activeToasts);
    }, []);

    if (typeof document === 'undefined') return null;

    return ReactDOM.createPortal(
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-3 pointer-events-none">
            {toasts.map(t => (
                <ToastItem key={t.id} {...t} onClose={() => removeToast(t.id)} />
            ))}
        </div>,
        document.body
    );
};

export default toast;
