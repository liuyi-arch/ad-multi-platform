import React from 'react';
import { AdDetailModal } from './AdDetailModal';
import { AdFormModal } from './AdFormModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { RejectionReasonModal } from './RejectionReasonModal';
import { Ad, ModalType } from '../../types';

interface MyModalProps {
    type: ModalType;
    ad: Ad | null;
    formMode: 'CREATE' | 'EDIT';
    onClose: () => void;
    onConfirm: (data?: any) => void;
}

const MyModal: React.FC<MyModalProps> = ({ type, ad, formMode, onClose, onConfirm }) => {
    if (!type) return null;
    switch (type) {
        case 'DETAIL': return ad ? <AdDetailModal ad={ad} onClose={onClose} /> : null;
        case 'DELETE': return ad ? <DeleteConfirmModal onClose={onClose} onConfirm={onConfirm} /> : null;
        case 'REJECT_REASON': return ad ? <RejectionReasonModal reason={ad.rejectionReason || '未提供原因'} onClose={onClose} /> : null;
        case 'FORM': return <AdFormModal mode={formMode} ad={ad} onClose={onClose} onSave={onConfirm} />;
        default: return null;
    }
};

export default MyModal;
export { AdDetailModal, AdFormModal, DeleteConfirmModal, RejectionReasonModal };

