import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { ToastType, toast, ToastItem as HookToastItem } from '@repo/hooks';

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

    const typeConfig: Record<ToastType, { icon: string; color: string; text: string }> = {
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

export const ToastContainer: React.FC = () => {
    const [toasts, setToasts] = useState<HookToastItem[]>([]);

    useEffect(() => {
        return toast._subscribe(setToasts);
    }, []);

    const removeToast = useCallback((id: number) => {
        toast._remove(id);
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

export { toast };
export default toast;
