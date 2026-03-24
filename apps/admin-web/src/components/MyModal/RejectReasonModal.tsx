import React, { useState } from 'react';
import { Modal } from '@repo/ui-components';

export const RejectReasonModal: React.FC<{ initialReason?: string; onClose: () => void; onConfirm: (reason: string) => void }> = ({ initialReason, onClose, onConfirm }) => {
    const [reason, setReason] = useState(initialReason || '广告图不清晰');
    return (
        <Modal
            title="驳回原因"
            onClose={onClose}
            onConfirm={() => onConfirm(reason)}
            variant="primary"
            confirmLabel="保存修改"
            cancelLabel="取消"
            maxWidth="max-w-lg"
        >
            <div>
                <label className="block text-sm font-bold text-[#1e293b] mb-2">修改驳回理由</label>
                <textarea
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm placeholder:text-slate-400 h-32 resize-none"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                />
                <p className="mt-2 text-xs text-slate-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">info</span>该理由将展示给广告主
                </p>
            </div>
        </Modal>
    );
};
