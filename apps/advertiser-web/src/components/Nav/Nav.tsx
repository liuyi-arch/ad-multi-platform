import React from 'react';
import { ViewType } from '../../types';
import { NAV_ITEMS } from '../../constants';

interface NavProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Nav: React.FC<NavProps> = ({ currentView, onViewChange }) => (
  <nav className="hidden md:flex items-center gap-8">
    {NAV_ITEMS.map((item) => (
      <button
        key={item.id}
        onClick={() => onViewChange(item.id as ViewType)}
        className={`text-sm font-bold pb-2 transition-all relative ${currentView === item.id ? 'text-[#2563eb] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#2563eb]' : 'text-[#64748b] hover:text-[#2563eb]'}`}
      >
        {item.label}
      </button>
    ))}
  </nav>
);

export default Nav;
