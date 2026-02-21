import React from 'react';
import { BrowserRouter, useRoutes, useLocation, useNavigate } from 'react-router-dom';
import { ViewType } from './types';
import Layout from './components/Layout';
import {
    AdDetailModal,
    AdFormModal,
    RejectionReasonModal,
    DeleteConfirmModal
} from './components/MyModal';
import { useAdsData, useSearch, useAdsModal } from '@repo/hooks';
import { getRoutes } from './routes';

const AppContent: React.FC = () => {
    const { ads, loading, error, ...dataMethods } = useAdsData();
    const { searchQuery, setSearchQuery, searchResults: searchAds } = useSearch(ads, ['title', 'description']);
    const { modal, openModal, closeModal, handleConfirm } = useAdsModal(dataMethods);

    const location = useLocation();
    const navigate = useNavigate();

    // Map current path to ViewType
    const getCurrentView = (): ViewType => {
        const path = location.pathname.substring(1); // remove leading slash
        if (path === '' || path === 'home') return 'GALLERY';
        if (path === 'my-ads') return 'DASHBOARD';
        return 'GALLERY';
    };

    const view = getCurrentView();

    const handleViewChange = (v: ViewType) => {
        const path = v === 'GALLERY' ? '/home' : '/my-ads';
        navigate(path);
    };

    const routing = useRoutes(getRoutes({ ads: searchAds, openModal }));

    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    if (isAuthPage) {
        return (
            <>
                {routing}

                {/* Modals - register might need alert modal etc */}
                {modal.type === 'DETAIL' && modal.ad && (
                    <AdDetailModal
                        ad={modal.ad}
                        onClose={closeModal}
                    />
                )}
            </>
        );
    }

    return (
        <Layout
            currentView={view}
            onViewChange={handleViewChange}
            onSearch={setSearchQuery}
            searchQuery={searchQuery}
        >
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-500 text-lg">加载中...</div>
                </div>
            ) : error ? (
                <div className="flex items-center justify-center h-64">
                    <div className="text-red-500 text-lg">加载失败: {error}</div>
                </div>
            ) : (
                routing
            )}

            {/* Modals */}
            {modal.type === 'DETAIL' && modal.ad && (
                <AdDetailModal
                    ad={modal.ad}
                    onClose={closeModal}
                />
            )}

            {modal.type === 'FORM' && (
                <AdFormModal
                    mode={modal.formMode}
                    ad={modal.ad}
                    onClose={closeModal}
                    onSave={handleConfirm}
                />
            )}

            {modal.type === 'DELETE' && modal.ad && (
                <DeleteConfirmModal
                    onClose={closeModal}
                    onConfirm={handleConfirm}
                />
            )}

            {modal.type === 'REJECT_REASON' && modal.ad && (
                <RejectionReasonModal
                    reason={modal.ad.rejectionReason || '未提供具体原因。'}
                    onClose={closeModal}
                />
            )}
        </Layout>
    );
};

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
};

export default App;
