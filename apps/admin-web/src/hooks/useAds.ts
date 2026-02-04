
import { useState, useMemo } from 'react';
import { AdItem, AdStatus, ModalType } from '../types';
import { MOCK_ADS } from '../mockData';

export const useAds = (initialSearchQuery: string = '') => {
  const [ads, setAds] = useState<AdItem[]>(MOCK_ADS);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [modal, setModal] = useState<{
    type: ModalType;
    ad: AdItem | null;
    formMode?: 'create' | 'edit';
  }>({ type: null, ad: null });

  const filteredAds = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return ads;
    return ads.filter(ad =>
      ad.id.toLowerCase().includes(query) ||
      ad.title.toLowerCase().includes(query) ||
      ad.description.toLowerCase().includes(query)
    );
  }, [searchQuery, ads]);

  const openModal = (type: ModalType, ad: AdItem | null = null, formMode?: 'create' | 'edit') => {
    setModal({ type, ad, formMode });
  };

  const closeModal = () => {
    setModal({ type: null, ad: null });
  };

  const handleConfirm = (payload?: any) => {
    const { type, ad, formMode } = modal;

    switch (type) {
      case 'DELETE':
        if (ad) setAds(prev => prev.filter(a => a.id !== ad.id));
        break;
      case 'APPROVE_ACTION':
        if (ad) setAds(prev => prev.map(a => a.id === ad.id ? { ...a, status: AdStatus.APPROVED } : a));
        break;
      case 'REJECT_ACTION':
        if (ad) setAds(prev => prev.map(a => a.id === ad.id ? { ...a, status: AdStatus.REJECTED } : a));
        break;
      case 'FORM':
        if (formMode === 'edit' && ad) {
          setAds(prev => prev.map(a => a.id === ad.id ? { ...a, ...payload } : a));
        } else {
          const newAd: AdItem = {
            ...payload,
            id: `AD-${Math.floor(1000 + Math.random() * 9000)}-NEW`,
            status: AdStatus.PENDING,
            heat: '0',
            date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
            thumbnail: 'https://picsum.photos/seed/new/400/225',
          };
          setAds(prev => [newAd, ...prev]);
        }
        break;
      case 'REJECT_REASON':
        if (ad) setAds(prev => prev.map(a => a.id === ad.id ? { ...a, status: AdStatus.REJECTED } : a));
        break;
    }
    closeModal();
  };

  return {
    ads,
    filteredAds,
    searchQuery,
    setSearchQuery,
    modal,
    openModal,
    closeModal,
    handleConfirm
  };
};
