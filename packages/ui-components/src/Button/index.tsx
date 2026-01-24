import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success' | 'reject';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    children = '按钮',
    variant = 'primary',
    size = 'md',
    icon,
    className = '',
    ...props
}: ButtonProps) => {
    const baseStyles = 'flex items-center justify-center gap-2 rounded-lg font-bold transition-all active:scale-95 cursor-pointer shadow-sm';

    const variantStyles = {
        primary: 'bg-primary hover:bg-primary/90 text-white',
        secondary: 'bg-[#e7ebf3] dark:bg-gray-800 hover:bg-[#dbe1ee] dark:hover:bg-gray-700 text-[#0d121b] dark:text-white',
        danger: 'bg-red-500 hover:bg-red-600 text-white',
        ghost: 'bg-transparent border border-[#e7ebf3] dark:border-gray-700 text-primary hover:bg-primary/5 shadow-none',
        success: 'bg-[#135bec] text-white hover:bg-[#135bec]/90',
        reject: 'bg-[#fff1f2] text-[#e11d48] border border-[#fecdd3] hover:bg-[#ffe4e6]',
    };

    const sizeStyles = {
        sm: 'h-8 px-3 text-xs',
        md: 'h-11 px-6 text-sm',
        lg: 'h-12 px-8 text-base',
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant as keyof typeof variantStyles]} ${sizeStyles[size as keyof typeof sizeStyles]} ${className}`}
            {...props}
        >
            {icon && <span className="material-symbols-outlined text-xl">{icon}</span>}
            {children}
        </button>
    );
};
