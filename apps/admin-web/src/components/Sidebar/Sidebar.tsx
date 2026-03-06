import React from 'react';
import { ViewType } from '../../types';
import { MENU_ITEMS } from '../../constants';
import { useSidebar } from './useSidebar';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const { isCollapsed, toggleSidebar, handleLogout } = useSidebar();



  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 ease-in-out flex-shrink-0 bg-navy-sidebar flex flex-col justify-between py-6 h-screen relative group`}>
      {/* 折叠切换按钮 */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 bg-primary text-white size-6 rounded-full flex items-center justify-center shadow-lg border border-white/20 z-10 hover:scale-110 transition-transform"
      >
        <span className="material-symbols-outlined text-sm">
          {isCollapsed ? 'chevron_right' : 'chevron_left'}
        </span>
      </button>

      <div className="flex flex-col gap-8 px-4">
        <div className={`flex items-center gap-3 px-2 overflow-hidden transition-all duration-300 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="bg-primary rounded-lg p-2 text-white shadow-lg shadow-primary/20 flex-shrink-0">
            <span className="material-symbols-outlined text-2xl">wall_art</span>
          </div>
          {!isCollapsed && (
            <div className="whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
              <h1 className="text-base font-bold leading-tight text-white">AdWall 管理系统</h1>
              <p className="text-slate-400 text-xs font-normal">后端管理系统</p>
            </div>
          )}
        </div>

        <nav className="flex flex-col gap-1.5">
          {MENU_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${currentView === item.id
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
                } ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item.label : ''}
            >
              <span className="material-symbols-outlined text-[22px] flex-shrink-0">{item.icon}</span>
              {!isCollapsed && (
                <p className="text-sm font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">{item.label}</p>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-1.5 px-4 pt-4 border-t border-white/10">
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer ${isCollapsed ? 'justify-center' : ''}`}
          title={isCollapsed ? '设置' : ''}
        >
          <span className="material-symbols-outlined text-[22px] flex-shrink-0">settings</span>
          {!isCollapsed && <p className="text-sm font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">设置</p>}
        </div>
        <div
          onClick={handleLogout}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-500 cursor-pointer transition-colors ${isCollapsed ? 'justify-center' : ''}`}
          title={isCollapsed ? '退出登录' : ''}
        >
          <span className="material-symbols-outlined text-[22px] flex-shrink-0">logout</span>
          {!isCollapsed && <p className="text-sm font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">退出登录</p>}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
