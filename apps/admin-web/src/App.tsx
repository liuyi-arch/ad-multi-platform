import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardPage from './pages/DashboardPage';
import AdManagementPage from './pages/AdManagementPage';
import MediaPage from './pages/MediaPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AccessControlPage from './pages/AccessControlPage';
import Modal from './components/Modal';
import { ViewType } from './types/index';
import { useAds } from './hooks/useAds';

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<ViewType>('dashboard');
    const {
        filteredAds,
        searchQuery,
        setSearchQuery,
        modal,
        openModal,
        closeModal,
        handleConfirm
    } = useAds();

    const getPageTitle = () => {
        switch (currentView) {
            case 'dashboard': return '数据仪表盘';
            case 'ad_management': return '广告库存';
            case 'media': return '媒体库';
            case 'analytics': return '数据分析';
            case 'access': return '访问控制';
            default: return '系统';
        }
    };

    const headerAction = currentView === 'ad_management' ? (
        <button
            onClick={() => openModal('FORM', null, 'create')}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
        >
            <span className="material-symbols-outlined text-lg">add</span>
            创建新广告
        </button>
    ) : undefined;

    return (
        <div className="flex min-h-screen overflow-hidden font-sans bg-background-base text-text-main">
            <Sidebar currentView={currentView} onViewChange={setCurrentView} />

            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header
                    title={getPageTitle()}
                    action={headerAction}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {currentView === 'dashboard' && (
                        <DashboardPage
                            ads={filteredAds}
                            onDetailClick={(ad) => openModal('DETAIL', ad)}
                        />
                    )}
                    {currentView === 'ad_management' && (
                        <AdManagementPage
                            ads={filteredAds}
                            onDetail={(ad) => openModal('DETAIL', ad)}
                            onDelete={(ad) => openModal('DELETE', ad)}
                            onReject={(ad) => openModal('REJECT_ACTION', ad)}
                            onApprove={(ad) => openModal('APPROVE_ACTION', ad)}
                            onEdit={(ad) => openModal('FORM', ad, 'edit')}
                            onViewRejectReason={(ad) => openModal('REJECT_REASON', ad)}
                        />
                    )}
                    {currentView === 'media' && <MediaPage />}
                    {currentView === 'analytics' && <AnalyticsPage />}
                    {currentView === 'access' && <AccessControlPage />}

                    <Footer />
                </div>
            </main>

            <Modal
                type={modal.type}
                ad={modal.ad}
                formMode={modal.formMode}
                onClose={closeModal}
                onConfirm={handleConfirm}
            />
        </div>
    );
};

export default App;
