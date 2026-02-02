
import React from 'react';
import { AdStatus } from '../../types/index';
import { FilterButton } from '../SortSelector';

type FilterType = 'ALL' | AdStatus;

interface TabProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const Tab: React.FC<TabProps> = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'ALL', label: '所有广告' },
    { id: AdStatus.PENDING, label: '待审核' },
    { id: AdStatus.ACTIVE, label: '已通过' },
    { id: AdStatus.REJECTED, label: '已拒绝' }
  ];

  return (
    <div className="p-4 border-b border-border-light flex items-center justify-between bg-slate-50/50 shrink-0">
      <div className="flex gap-2">
        {filters.map((btn) => (
          <button
            key={btn.id}
            onClick={() => onFilterChange(btn.id as FilterType)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeFilter === btn.id
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-muted hover:bg-white hover:text-text-main border border-transparent hover:border-border-light'
              }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <FilterButton />
    </div>
  );
};

export default Tab;
