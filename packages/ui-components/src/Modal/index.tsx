
import React, { ReactNode } from 'react';

export interface ModalProps {
  title: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'info' | 'danger' | 'primary';
  maxWidth?: string;
  children?: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  onClose,
  onConfirm,
  confirmLabel = '确定',
  cancelLabel = '取消',
  variant = 'info',
  maxWidth = 'max-w-xl',
  children
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className={`relative bg-white w-full ${maxWidth} rounded-2xl shadow-soft flex flex-col overflow-hidden max-h-[90vh] animate-in zoom-in duration-200`}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <h3 className="text-lg font-bold text-[#1e293b]">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-md text-[#64748b] hover:text-[#1e293b] hover:bg-slate-100 transition-all">
            <span className="material-symbols-outlined block">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          {children}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-white shrink-0">
          {variant === 'info' ? (
            <button 
              onClick={onClose} 
              className="h-11 min-w-[120px] px-6 text-sm font-bold rounded-lg transition-colors bg-[#e7ebf3] hover:bg-[#dbe1ee] text-[#0d121b]"
            >
              {cancelLabel}
            </button>
          ) : (
            <>
              <button 
                onClick={onClose} 
                className="h-11 min-w-[120px] px-6 text-sm font-bold rounded-lg transition-colors bg-[#e7ebf3] hover:bg-[#dbe1ee] text-[#0d121b]"
              >
                {cancelLabel}
              </button>
              <button 
                onClick={onConfirm} 
                className={`px-8 py-2.5 text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg ${
                  variant === 'danger' 
                    ? 'bg-[#ef4444] shadow-red-500/20' 
                    : 'bg-primary shadow-blue-500/20'
                }`}
              >
                {confirmLabel}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
