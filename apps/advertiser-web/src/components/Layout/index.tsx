
import React from 'react';
import { ViewType } from '../../types';
import HeadNav from '../Nav/HeadNav';
import SearchBox from '../SearchBox/SearchBox';

interface PageLayoutProps {
  children: React.ReactNode;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, currentView, onViewChange, onSearch, searchQuery }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-100 px-4 lg:px-20 py-3 shadow-sm">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="size-9 bg-[#2563eb] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <span className="material-symbols-outlined text-xl">campaign</span>
              </div>
              <h1 className="text-[#1e293b] text-xl font-bold tracking-tight">AdWall</h1>
            </div>
            <HeadNav currentView={currentView} onViewChange={onViewChange} />
          </div>
          <div className="flex items-center gap-4">
            <SearchBox 
              value={searchQuery} 
              onSearch={onSearch} 
              placeholder={currentView === 'GALLERY' ? "搜索广告..." : "搜索我的广告..."} 
            />
            <div className="size-10 rounded-full bg-cover bg-center border-2 border-white shadow-md cursor-pointer overflow-hidden bg-slate-100">
                <img src="https://picsum.photos/seed/user123/100/100" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 lg:px-20 py-10">
        {children}
      </main>

      <footer className="py-12 flex flex-col items-center gap-4 bg-transparent mt-auto">
        <div className="flex items-center gap-8">
          <a className="text-sm font-medium text-slate-500 hover:text-[#2563eb] transition-colors" href="#">帮助中心</a>
          <a className="text-sm font-medium text-slate-500 hover:text-[#2563eb] transition-colors" href="#">服务协议</a>
          <a className="text-sm font-medium text-slate-500 hover:text-[#2563eb] transition-colors" href="#">隐私政策</a>
        </div>
        <p className="text-xs font-medium text-slate-400/80 uppercase tracking-widest">
          © 2024 ADWALL TECHNOLOGIES. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
};

export default PageLayout;
