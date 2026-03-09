import React from 'react';
import { Modal } from '@repo/ui-components';

export const RejectionReasonModal: React.FC<{ reason: string; onClose: () => void }> = ({ reason, onClose }) => (
    <Modal
        title="驳回原因"
        onClose={onClose}
        variant="info"
        cancelLabel="关闭"
        maxWidth="max-w-xl"
    >
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
            <p className="text-sm text-[#64748b] leading-relaxed">{reason}</p>
        </div>
    </Modal>
);
