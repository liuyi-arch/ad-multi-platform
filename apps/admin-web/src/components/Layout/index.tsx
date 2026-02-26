import React from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { Footer } from '@repo/ui-components';
import { ViewType } from '../../types';

interface LayoutProps {
    title: string;
    action?: React.ReactNode;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    currentNav: ViewType;
    onNavChange: (nav: ViewType) => void;
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
    title,
    action,
    searchQuery,
    onSearchChange,
    currentNav,
    onNavChange,
    children
}) => {
    return (
        <div className="flex min-h-screen overflow-hidden font-sans bg-background-base text-text-main">
            <Sidebar currentView={currentNav} onViewChange={onNavChange} />

            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header
                    title={title}
                    action={action}
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
