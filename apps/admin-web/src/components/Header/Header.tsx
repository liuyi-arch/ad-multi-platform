import React from 'react';
import { SearchBox } from '@repo/ui-components';
import { ViewType } from '../../types';

interface HeaderProps {
  title: string;
  action?: React.ReactNode;
  currentNav?: ViewType;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ title, action, currentNav, searchQuery, onSearchChange }) => {
  return (
    <header className="flex items-center bg-surface border-b border-border-light px-8 py-4 sticky top-0 z-10 gap-8 min-h-[64px]">
      <div className="flex items-center gap-6 flex-1">
        <h2 className="text-lg font-bold text-text-main whitespace-nowrap">{title}</h2>
        <SearchBox value={searchQuery} onChange={onSearchChange} variant="global" />
      </div>

      <div className="flex items-center gap-6">
        {(!currentNav || !['dashboard', 'analytics', 'access'].includes(currentNav)) && action}

        <div className="flex items-center gap-3 pl-6 border-l border-border-light">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-text-main leading-none">Alex Rivera</p>
            <p className="text-[11px] text-text-muted mt-1 uppercase tracking-wider font-semibold">Administrator</p>
          </div>
          <div
            className="size-9 rounded-full bg-slate-200 ring-2 ring-background-base ring-offset-2 ring-offset-border-light overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuALJMPFKQhS3KcINZ8CAUYB0MhisFmNtNq3yUiw93-NW_fqhAEurJfJeOrh9YyEfkIZ14ND3WLAPdJvJdANdczQNB8mqqER7y-JH1NPBTLWrC0BWfjqpimx5oVbQhZeI5OF2ALr6U0NzFpjiRpJHzIWCG_HTA0WFtBAeLq-v5Xmk8rKKRXd_FNK_lqvhjrHtJsKT4r93Qa8dscVIbj558rTtJGCjj-IVIFpcL-HVmtvV6iMUQqCL1eCY_eNYhn52CJp-lQY6vfTagI")' }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
