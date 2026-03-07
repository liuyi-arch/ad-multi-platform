import { create } from 'zustand';
import { Ad, AdStatus, ModalType } from '@repo/shared-types';

export type FormMode = 'CREATE' | 'EDIT';

interface ModalState {
  type: ModalType;
  ad: Ad | null;
  formMode: FormMode;
  isOpen: boolean;

  // Actions
  openModal: (type: ModalType, ad?: Ad | null, formMode?: FormMode) => void;
  closeModal: () => void;
  handleConfirm: (payload: any, actions: { 
    addAd: (p: any) => Promise<any>; 
    updateAd: (id: string, p: any) => Promise<void>;
    deleteAd: (id: string) => Promise<void>;
    updateAdStatus: (id: string, s: AdStatus) => Promise<void>;
  }) => Promise<void>;
}

export const useModalStore = create<ModalState>((set, get) => ({
  type: null,
  ad: null,
  formMode: 'CREATE',
  isOpen: false,

  openModal: (type, ad = null, formMode = 'CREATE') => set({
    type,
    ad,
    formMode,
    isOpen: true
  }),

  closeModal: () => set({
    type: null,
    ad: null,
    isOpen: false
  }),

  handleConfirm: async (payload, actions) => {
    const { type, ad, formMode } = get();
    if (!type) return;

    switch (type) {
      case 'DELETE':
        if (ad) await actions.deleteAd(ad.id);
        break;
      case 'APPROVE_ACTION':
        if (ad) await actions.updateAdStatus(ad.id, AdStatus.APPROVED);
        break;
      case 'REJECT_ACTION':
      case 'REJECT_REASON':
        if (ad) await actions.updateAdStatus(ad.id, AdStatus.REJECTED);
        break;
      case 'FORM': {
        if (formMode === 'EDIT' && ad) {
          const nextPayload = { ...payload };
          if (ad.status === AdStatus.APPROVED || ad.status === AdStatus.REJECTED) {
            nextPayload.status = AdStatus.PENDING;
          }
          await actions.updateAd(ad.id, nextPayload);
        } else {
          await actions.addAd(payload);
        }
        break;
      }
    }
    get().closeModal();
  }
}));
