
import React from 'react';

/**
 * 原有的更多筛选按钮组件
 */
export const FilterButton: React.FC = () => {
  return (
    <button className="flex items-center gap-1.5 text-xs font-bold text-text-muted hover:text-text-main transition-colors">
      <span className="material-symbols-outlined text-lg">filter_list</span>
      更多筛选
    </button>
  );
};

/**
 * 从 TrendChart 抽离的时间范围选择下拉框组件
 */
interface TimeframeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ value, onChange }) => {
  return (
    <select 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-background-base border-border-light rounded-lg text-xs font-medium focus:ring-primary text-text-main px-3 py-1.5 outline-none"
    >
      <option value="7d">最近 7 天</option>
      <option value="1m">最近 30 天</option>
      <option value="3m">最近 90 天</option>
    </select>
  );
};
