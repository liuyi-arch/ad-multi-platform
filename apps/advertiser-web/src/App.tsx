import React, { useState, useMemo } from 'react';
import { Ad, AdStatus, ViewType } from './types';
import { MOCK_ADS } from './mockData';
import Layout from './components/Layout';
import Home from './pages/home';
import MyAd from './pages/myAd';
import {
    AdDetailModal,
    AdFormModal,
    RejectionReasonModal,
    DeleteConfirmModal
} from './components/Modal';

const App: React.FC = () => {
    console.log('App component is rendering');
    const [view, setView] = useState<ViewType>('GALLERY');
    const [ads, setAds] = useState<Ad[]>(MOCK_ADS);
    const [searchQuery, setSearchQuery] = useState('');

    // Modal States
    const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formMode, setFormMode] = useState<'CREATE' | 'EDIT'>('CREATE');
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [isRejectionOpen, setIsRejectionOpen] = useState(false);

    const filteredAds = useMemo(() => {
        return ads.filter(ad =>
            ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ad.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [ads, searchQuery]);

    // Handlers
    const handleOpenDetail = (ad: Ad) => {
        setSelectedAd(ad);
        setIsDetailOpen(true);
    };

    const handleOpenCreate = () => {
        setSelectedAd(null);
        setFormMode('CREATE');
        setIsFormOpen(true);
    };

    const handleOpenEdit = (ad: Ad) => {
        setSelectedAd(ad);
        setFormMode('EDIT');
        setIsFormOpen(true);
    };

    const handleOpenDelete = (ad: Ad) => {
        setSelectedAd(ad);
        setIsDeleteConfirmOpen(true);
    };

    const handleOpenRejection = (ad: Ad) => {
        setSelectedAd(ad);
        setIsRejectionOpen(true);
    };

    const handleDeleteAd = () => {
        if (selectedAd) {
            setAds(prev => prev.filter(a => a.id !== selectedAd.id));
            setIsDeleteConfirmOpen(false);
            setSelectedAd(null);
        }
    };

    const handleSaveAd = (adData: Partial<Ad>) => {
        if (formMode === 'CREATE') {
            const newAd: Ad = {
                id: Math.random().toString(36).substr(2, 9),
                title: adData.title || '',
                publisher: adData.publisher || '匿名用户',
                description: adData.description || '',
                bid: Number(adData.bid) || 0,
                heat: 0,
                status: AdStatus.PENDING,
                createDate: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
                imageUrl: adData.imageUrl || 'https://picsum.photos/400/250',
                category: adData.category || '未分类',
                landingPage: adData.landingPage || '',
            };
            setAds([newAd, ...ads]);
        } else if (selectedAd) {
            setAds(prev => prev.map(a => a.id === selectedAd.id ? { ...a, ...adData } : a));
        }
        setIsFormOpen(false);
    };

    return (
        <Layout
            currentView={view}
            onViewChange={setView}
            onSearch={setSearchQuery}
            searchQuery={searchQuery}
        >
            {view === 'GALLERY' ? (
                <Home
                    ads={filteredAds.filter(a => a.status === AdStatus.APPROVED)}
                    onOpenDetail={handleOpenDetail}
                    onOpenCreate={handleOpenCreate}
                />
            ) : (
                <MyAd
                    ads={filteredAds}
                    onOpenEdit={handleOpenEdit}
                    onOpenDelete={handleOpenDelete}
                    onOpenRejection={handleOpenRejection}
                    onOpenDetail={handleOpenDetail}
                />
            )}

            {/* Modals */}
            {isDetailOpen && selectedAd && (
                <AdDetailModal
                    ad={selectedAd}
                    onClose={() => setIsDetailOpen(false)}
                />
            )}

            {isFormOpen && (
                <AdFormModal
                    mode={formMode}
                    ad={selectedAd}
                    onClose={() => setIsFormOpen(false)}
                    onSave={handleSaveAd}
                />
            )}

            {isDeleteConfirmOpen && selectedAd && (
                <DeleteConfirmModal
                    onClose={() => setIsDeleteConfirmOpen(false)}
                    onConfirm={handleDeleteAd}
                />
            )}

            {isRejectionOpen && selectedAd && (
                <RejectionReasonModal
                    reason={selectedAd.rejectionReason || '未提供具体原因。'}
                    onClose={() => setIsRejectionOpen(false)}
                />
            )}
        </Layout>
    );
};

export default App;
