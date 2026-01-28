
import React from 'react';

interface SortSelectorProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

const SortSelector: React.FC<SortSelectorProps> = ({ sortBy, onSortChange }) => (
  <div className="flex items-center gap-3">
    <span className="text-sm font-bold text-slate-500">排序方式:</span>
    <div className="relative inline-block w-48">
      <select 
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="appearance-none w-full bg-slate-50 border border-slate-200 text-[#1e293b] text-sm font-medium px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-[#2563eb] cursor-pointer transition-all"
      >
        <option value="time">按时间排序</option>
        <option value="bid_desc">按出价降序</option>
        <option value="heat_desc">按热度降序</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
        <span className="material-symbols-outlined text-xl">expand_more</span>
      </div>
    </div>
  </div>
);

export default SortSelector;
