import React from 'react';
import { Modal } from '@repo/ui-components';

export const ApproveConfirmModal: React.FC<{ onClose: () => void; onConfirm: () => void }> = ({ onClose, onConfirm }) => (
    <Modal
        title="确认通过"
        onClose={onClose}
        onConfirm={onConfirm}
        variant="primary"
        confirmLabel="确认通过"
        cancelLabel="取消"
        maxWidth="max-w-[480px]"
    >
        <p className="text-base text-[#1e293b]">您确定要通过该广告申请吗？通过后广告将正式投放展示。</p>
    </Modal>
);
