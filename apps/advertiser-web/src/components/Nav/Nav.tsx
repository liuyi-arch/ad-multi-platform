
import React from 'react';
import { ViewType } from '../../types';

interface HeadNavProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const HeadNav: React.FC<HeadNavProps> = ({ currentView, onViewChange }) => (
  <nav className="hidden md:flex items-center gap-8">
    <button 
      onClick={() => onViewChange('GALLERY')}
      className={`text-sm font-bold pb-2 transition-all relative ${currentView === 'GALLERY' ? 'text-[#2563eb] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#2563eb]' : 'text-[#64748b] hover:text-[#2563eb]'}`}
    >
      首页
    </button>
    <button 
      onClick={() => onViewChange('DASHBOARD')}
      className={`text-sm font-bold pb-2 transition-all relative ${currentView === 'DASHBOARD' ? 'text-[#2563eb] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#2563eb]' : 'text-[#64748b] hover:text-[#2563eb]'}`}
    >
      我的广告
    </button>
  </nav>
);

export default HeadNav;
