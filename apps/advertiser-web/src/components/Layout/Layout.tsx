import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@repo/hooks';
import { ViewType } from '../../types';
import HeadNav from '../Nav/Nav';
import { Footer, SearchBox } from '@repo/ui-components';

interface PageLayoutProps {
  children: React.ReactNode;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, currentView, onViewChange, onSearch, searchQuery }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const timeoutRef = useRef<any>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowMenu(false);
    }, 200); // 200ms 延迟，允许通过间隙
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-100 px-4 lg:px-20 py-3 shadow-sm">
        <div className="max-w-[1920px] mx-auto flex items-center justify-between">
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
              onChange={onSearch}
              variant="inline"
              placeholder={currentView === 'GALLERY' ? "搜索广告..." : "搜索我的广告..."}
            />

            {/* 用户菜单区域 */}
            <div
              className="relative py-2" // 增加 padding 区域以便悬停过渡
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="size-10 rounded-full bg-cover bg-center border-2 border-white shadow-md cursor-pointer overflow-hidden bg-slate-100 transition-transform active:scale-95"
              >
                <img src="https://picsum.photos/seed/user123/100/100" alt="Avatar" className="w-full h-full object-cover" />
              </div>

              {showMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 border-b border-slate-50">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">当前账号</p>
                    <p className="text-sm font-bold text-slate-700 truncate">{user?.phone || '未登录'}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-500 hover:bg-rose-50 transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">logout</span>
                    <span className="font-medium">退出登录</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1920px] w-full mx-auto px-4 lg:px-20 py-10">
        {children}
      </main>

      <Footer className="mt-auto" />
    </div>
  );
};

export default PageLayout;
