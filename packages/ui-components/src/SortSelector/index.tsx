import { FC, ChangeEvent, ReactNode } from 'react';

export interface SortOption {
  value: string;
  label: string;
}

export interface SortSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
  options?: SortOption[];
  variant?: 'sort' | 'filter' | 'select';
  label?: string;
  className?: string;
  onClick?: () => void; // 用于 filter 变体
  children?: ReactNode; // 用于自定义内容
}

export const SortSelector: FC<SortSelectorProps> = ({
  value,
  onChange,
  options = [],
  variant = 'sort',
  label = '排序方式:',
  className = '',
  onClick,
}) => {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  // admin-web 中 TimeframeSelector 下拉框 (select 变体)
  if (variant === 'select') {
    return (
      <select
        value={value}
        onChange={handleSelectChange}
        className={`bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500/10 text-[#1e293b] px-3 py-1.5 outline-none transition-all ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  // admin-web 中 FilterButton 下拉框 (filter 变体)
  if (variant === 'filter') {
    return (
      <button
        onClick={onClick}
        className={`flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#1e293b] transition-colors ${className}`}
      >
        <span className="material-symbols-outlined text-lg">filter_list</span>
        更多筛选
      </button>
    );
  }

  // advertiser-web 中默认下拉框 (sort 变体)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {label && <span className="text-sm font-bold text-slate-500">{label}</span>}
      <div className="relative inline-block w-48">
        <select
          value={value}
          onChange={handleSelectChange}
          className="appearance-none w-full bg-slate-50 border border-slate-200 text-[#1e293b] text-sm font-medium px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-[#2563eb] cursor-pointer transition-all"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
          <span className="material-symbols-outlined text-xl">expand_more</span>
        </div>
      </div>
    </div>
  );
};
