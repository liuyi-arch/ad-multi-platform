import React from 'react';
import { Modal } from '@repo/ui-components';

export const DeleteConfirmModal: React.FC<{ onClose: () => void; onConfirm: () => void }> = ({ onClose, onConfirm }) => (
    <Modal
        title="确认删除"
        onClose={onClose}
        onConfirm={onConfirm}
        variant="danger"
        confirmLabel="确认删除"
        cancelLabel="取消"
        maxWidth="max-w-[480px]"
    >
        <div>
            <p className="text-[#1e293b] font-bold text-base mb-2">您确定要删除此广告吗？</p>
            <p className="text-[#64748b] text-[15px] leading-relaxed">删除后将无法恢复。此项操作将永久从数据库中移除该广告及其关联数据。</p>
        </div>
    </Modal>
);
