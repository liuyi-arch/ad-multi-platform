import React from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { Footer } from '@repo/ui-components';
import { ViewType } from '../../types';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
    title: string;
    action?: React.ReactNode;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    currentNav: ViewType;
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
    title,
    action,
    searchQuery,
    onSearchChange,
    currentNav,
    children
}) => {
    const navigate = useNavigate();

    const handleNavChange = (nav: ViewType) => {
        const path = nav === 'dashboard' ? '/' : nav === 'ad_management' ? '/ads' : `/${nav}`;
        navigate(path);
    };

    return (
        <div className="flex min-h-screen overflow-hidden font-sans bg-background-base text-text-main">
            <Sidebar currentView={currentNav} onViewChange={handleNavChange} />

            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header
                    title={title}
                    action={action || title}
                    currentNav={currentNav}
                    searchQuery={searchQuery}
                    onSearchChange={onSearchChange}
                />

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {children}
                    <Footer className="mt-12" />
                </div>
            </main>
        </div>
    );
};

export default Layout;
