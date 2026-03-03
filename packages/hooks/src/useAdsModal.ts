import { useState } from 'react';
import { Ad, AdStatus, ModalType } from '@repo/shared-types';

interface AdsDataMethods {
  addAd: (payload: any) => void;
  updateAd: (id: string, payload: any) => void;
  deleteAd: (id: string) => void;
  updateAdStatus?: (id: string, status: AdStatus) => void;
}

/**
 * 弹窗逻辑共享 Hook：负责弹窗状态控制及操作分发
 */
export const useAdsModal = (methods: AdsDataMethods) => {
  const [modal, setModal] = useState<{
    type: ModalType;
    ad: Ad | null;
    formMode: 'CREATE' | 'EDIT';
  }>({ 
    type: null, 
    ad: null,
    formMode: 'CREATE'
  });

  const { addAd, updateAd, deleteAd, updateAdStatus } = methods;

  const openModal = (type: ModalType, ad: Ad | null = null, formMode: 'CREATE' | 'EDIT' = 'CREATE') => {
    setModal({ type, ad, formMode });
  };

  const closeModal = () => {
    setModal(prev => ({ ...prev, type: null, ad: null }));
  };

  const handleConfirm = (payload?: any) => {
    const { type, ad, formMode } = modal;

    if (!type) return;

    switch (type) {
      case 'DELETE':
        if (ad) deleteAd(ad.id);
        break;
      case 'APPROVE_ACTION':
        if (ad && updateAdStatus) updateAdStatus(ad.id, AdStatus.APPROVED);
        break;
      case 'REJECT_ACTION':
      case 'REJECT_REASON':
        if (ad && updateAdStatus) updateAdStatus(ad.id, AdStatus.REJECTED);
        break;
      case 'FORM': {
        if (formMode === 'EDIT' && ad) {
          // 需求：已通过/已拒绝的广告被修改后，状态回退为待审核
          const nextPayload = { ...payload };
          if (ad.status === AdStatus.APPROVED || ad.status === AdStatus.REJECTED) {
            nextPayload.status = AdStatus.PENDING;
          }
          updateAd(ad.id, nextPayload);
        } else {
          addAd(payload);
        }
        break;
      }
    }
    closeModal();
  };

  return {
    modal,
    openModal,
    closeModal,
    handleConfirm
  };
};
