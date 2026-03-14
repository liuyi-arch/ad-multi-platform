
import { FC } from 'react';
import { Modal } from '@repo/ui-components';
import { AdItem } from '../../types/index';

export const DeleteConfirmModal: FC<{ ad: AdItem; onClose: () => void; onConfirm: () => void; }> = ({ ad, onClose, onConfirm }) => (
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
            <p className="text-text-main font-bold text-base mb-2">您确定要删除广告 "{ad.title}" 吗？</p>
            <p className="text-text-muted text-[15px] leading-relaxed">删除后将无法恢复。此项操作将永久从数据库中移除该广告及其关联数据。</p>
        </div>
    </Modal>
);
