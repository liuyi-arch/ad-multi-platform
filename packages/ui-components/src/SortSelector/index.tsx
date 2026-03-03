import { FC, ChangeEvent, useState, useRef } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<any>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const currentOption = options.find(opt => opt.value === value) || options[0];

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  // admin-web 中 TimeframeSelector 下拉框 (select 变体) - 保持原生或简单 select，通常这种不需要悬停
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

  // 渲染自定义下拉列表
  const renderDropdown = () => (
    <div
      className="absolute left-0 top-full mt-1 w-full min-w-[120px] bg-white rounded-xl shadow-2xl border border-slate-100 py-1.5 z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {options.map((option) => (
        <div
          key={option.value}
          onClick={() => {
            onChange?.(option.value);
            setIsOpen(false);
          }}
          className={`px-4 py-2 text-sm cursor-pointer transition-colors ${value === option.value
            ? 'bg-blue-50 text-blue-600 font-bold'
            : 'text-slate-600 hover:bg-slate-50'
            }`}
        >
          {option.label}
        </div>
      ))}
    </div>
  );

  // admin-web 中 FilterButton 下拉框 (filter 变体)
  if (variant === 'filter') {
    return (
      <div
        className={`relative inline-block pb-1 ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={onClick}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#1e293b] transition-colors py-1"
        >
          <span className="material-symbols-outlined text-lg">filter_list</span>
          更多筛选
        </button>
        {isOpen && options.length > 0 && renderDropdown()}
      </div>
    );
  }

  // advertiser-web 中默认下拉框 (sort 变体)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {label && <span className="text-sm font-bold text-slate-500">{label}</span>}
      <div
        className="relative inline-block w-48 py-1"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="flex items-center justify-between w-full bg-slate-50 border border-slate-200 text-[#1e293b] text-sm font-medium px-4 py-2 rounded-lg cursor-pointer transition-all hover:border-blue-400 hover:bg-white"
        >
          <span className="truncate">{currentOption?.label || '请选择'}</span>
          <span className="material-symbols-outlined text-xl text-slate-400 transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180)deg' : 'none' }}>
            expand_more
          </span>
        </div>
        {isOpen && options.length > 0 && renderDropdown()}
      </div>
    </div>
  );
};
