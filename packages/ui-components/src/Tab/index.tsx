import type { ReactNode } from 'react';

export interface TabOption {
  id: string;
  label: string;
}

export interface TabProps {
  options: TabOption[];
  activeId: string;
  onTabChange: (id: string) => void;
  variant?: 'soft' | 'sharp' | 'line'; // soft: advertiser-web, sharp: admin-web, line: bottom highlighted
  rightElement?: ReactNode;
  className?: string;
}

export const Tab = ({
  options,
  activeId,
  onTabChange,
  variant = 'soft',
  rightElement,
  className = '',
}: TabProps) => {
  if (variant === 'line') {
    return (
      <div className={`flex border-b border-[#eef0f2] ${className}`}>
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onTabChange(option.id)}
            className={`flex-1 relative px-6 py-4 text-[15px] font-medium transition-all duration-200 border-b-2 ${activeId === option.id
                ? 'border-[#135bec] text-[#135bec]'
                : 'border-transparent text-[#8a94a6] hover:text-[#1a1d23]'
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  }

  const isSoft = variant === 'soft';

  if (isSoft) {
    return (
      <div className={`px-6 py-5 border-b border-slate-50 ${className}`}>
        <div className="flex items-center gap-2 p-1 bg-[#f8fafc] w-fit rounded-xl">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => onTabChange(option.id)}
              className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeId === option.id
                  ? 'bg-[#2563eb] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 'sharp' variant for admin-web
  return (
    <div className={`p-4 border-b border-border-light flex items-center justify-between bg-slate-50/50 shrink-0 ${className}`}>
      <div className="flex gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onTabChange(option.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeId === option.id
                ? 'bg-[#135bec] text-white shadow-sm' // admin-web primary color is #135bec
                : 'text-slate-500 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-200'
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      {rightElement}
    </div>
  );
};

export default Tab;
