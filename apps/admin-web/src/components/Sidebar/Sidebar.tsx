
import React from 'react';
import { ViewType } from '../../types';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard' as ViewType, label: '仪表盘', icon: 'dashboard' },
    { id: 'ad_management' as ViewType, label: '广告管理', icon: 'campaign' },
    { id: 'media' as ViewType, label: '媒体库', icon: 'perm_media' },
    { id: 'analytics' as ViewType, label: '数据分析', icon: 'bar_chart_4_bars' },
    { id: 'access' as ViewType, label: '访问控制', icon: 'admin_panel_settings' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-navy-sidebar flex flex-col justify-between py-6 h-screen">
      <div className="flex flex-col gap-8 px-4">
        <div className="flex items-center gap-3 px-2">
          <div className="bg-primary rounded-lg p-2 text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-2xl">wall_art</span>
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight text-white">AdWall 管理系统</h1>
            <p className="text-slate-400 text-xs font-normal">后端管理系统</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1.5">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                currentView === item.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
              <p className="text-sm font-medium">{item.label}</p>
            </div>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-1.5 px-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer">
          <span className="material-symbols-outlined text-[22px]">settings</span>
          <p className="text-sm font-medium">设置</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-500 cursor-pointer transition-colors">
          <span className="material-symbols-outlined text-[22px]">logout</span>
          <p className="text-sm font-medium">退出登录</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
