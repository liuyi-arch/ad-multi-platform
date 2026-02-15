import React from 'react';
import { BrowserRouter, useRoutes, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Footer } from '@repo/ui-components';
import MyModal from './components/MyModal';
import { useAdsData, useSearch, useAdsModal } from '@repo/hooks';
import { ViewType } from './types';
import { getRoutes } from './routes';

// Layout component to wrap pages with Sidebar and Header
const AppLayout: React.FC<{
    headTitle: string;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    currentNav: ViewType;
    setCurrentNav: (nav: ViewType) => void;
    onOpenCreate: () => void;
    children: React.ReactNode;
}> = ({ headTitle, searchQuery, setSearchQuery, currentNav, setCurrentNav, onOpenCreate, children }) => {

    const headerAction = currentNav === 'ad_management' ? (
        <button
            onClick={onOpenCreate}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
        >
            <span className="material-symbols-outlined text-lg">add</span>
            创建新广告
        </button>
    ) : undefined;

    return (
        <div className="flex min-h-screen overflow-hidden font-sans bg-background-base text-text-main">
            <Sidebar currentView={currentNav} onViewChange={setCurrentNav} />

            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header
                    title={headTitle}
                    action={headerAction}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {children}
                    <Footer className="mt-12" />
                </div>
            </main>
        </div>
    );
};

// Wrapper to handle navigation logic
const AppContent: React.FC = () => {
    const { ads, loading, error, ...dataMethods } = useAdsData();
    const { searchQuery, setSearchQuery, searchResults: searchAds } = useSearch(ads, ['id', 'title', 'description']);
    const { modal, openModal, closeModal, handleConfirm } = useAdsModal(dataMethods);

    const location = useLocation();
    const navigate = useNavigate();

    // Map current path to ViewType
    const getCurrentNav = (): ViewType => {
        const path = location.pathname.substring(1); // remove leading slash
        if (path === '' || path === 'dashboard') return 'dashboard';
        if (path === 'ads') return 'ad_management';
        return path as ViewType;
    };

    const currentNav = getCurrentNav();

    const handleNavChange = (nav: ViewType) => {
        const path = nav === 'dashboard' ? '/' : nav === 'ad_management' ? '/ads' : `/${nav}`;
        navigate(path);
    };

    const getPageTitle = (nav: ViewType) => {
        switch (nav) {
            case 'dashboard': return '数据仪表盘';
            case 'ad_management': return '广告库存';
            case 'media': return '媒体库';
            case 'analytics': return '数据分析';
            case 'access': return '访问控制';
            default: return '系统';
        }
    };

    const routing = useRoutes(getRoutes({ ads: searchAds, openModal }));

    return (
        <>
            <AppLayout
                headTitle={getPageTitle(currentNav)}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                currentNav={currentNav}
                setCurrentNav={handleNavChange}
                onOpenCreate={() => openModal('FORM', null, 'CREATE')}
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
            </AppLayout>

            <MyModal
                type={modal.type}
                ad={modal.ad}
                formMode={modal.formMode}
                onClose={closeModal}
                onConfirm={handleConfirm}
            />
        </>
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
