import React from 'react';
import { AdItem, ModalType } from '../../types/index';
import { AdDetailModal } from './AdDetailModal';
import { AdFormModal } from './AdFormModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { RejectActionModal } from './RejectActionModal';
import { ApproveConfirmModal } from './ApproveConfirmModal';
import { RejectReasonModal } from './RejectReasonModal';

const MyModal: React.FC<{
  type: ModalType;
  ad: AdItem | null;
  formMode: 'CREATE' | 'EDIT';
  onClose: () => void;
  onConfirm: (data?: any) => void
}> = ({ type, ad, formMode, onClose, onConfirm }) => {
  if (!type) return null;
  switch (type) {
    case 'DETAIL': return ad ? <AdDetailModal ad={ad} onClose={onClose} /> : null;
    case 'DELETE': return ad ? <DeleteConfirmModal ad={ad} onClose={onClose} onConfirm={onConfirm} /> : null;
    case 'REJECT_ACTION': return <RejectActionModal ad={ad} onClose={onClose} onConfirm={onConfirm} />;
    case 'APPROVE_ACTION': return <ApproveConfirmModal onClose={onClose} onConfirm={onConfirm} />;
    case 'REJECT_REASON': return <RejectReasonModal ad={ad} onClose={onClose} onConfirm={onConfirm} />;
    case 'FORM': return <AdFormModal ad={ad} formMode={formMode} onClose={onClose} onConfirm={onConfirm} />;
    default: return null;
  }
};

export default MyModal;
export { AdDetailModal, AdFormModal, DeleteConfirmModal, RejectActionModal, ApproveConfirmModal, RejectReasonModal };
