import React, { useState } from 'react';
import { Modal } from '@repo/ui-components';

export const RejectActionModal: React.FC<{ onClose: () => void; onConfirm: (reason: string) => void }> = ({ onClose, onConfirm }) => {
    const [reason, setReason] = useState('');
    return (
        <Modal
            title="驳回理由"
            onClose={onClose}
            onConfirm={() => onConfirm(reason)}
            variant="danger"
            confirmLabel="确认驳回"
            cancelLabel="取消"
            maxWidth="max-w-[480px]"
        >
            <div className="space-y-2">
                <label className="block text-sm font-bold text-text-main">驳回原因</label>
                <textarea
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm placeholder:text-slate-400 min-h-[160px] resize-none"
                    placeholder="请填写驳回原因，以便广告主修改..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                />
            </div>
        </Modal>
    );
};
