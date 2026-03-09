import { FC, ChangeEvent } from 'react';

export interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variant?: 'inline' | 'global';
  className?: string;
}

export const SearchBox: FC<SearchBoxProps> = ({
  value,
  onChange,
  placeholder = "搜索...",
  variant = 'inline',
  className = '',
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  if (variant === 'global') {
    return (
      <div className={`relative flex-1 max-w-md ${className}`}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-slate-400 text-xl">search</span>
        </div>
        <input
          className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-[#1e293b] placeholder:text-slate-400 outline-none"
          placeholder={placeholder}
          type="text"
          value={value}
          onChange={handleChange}
        />
      </div>
    );
  }

  return (
    <div className={`hidden sm:flex items-center bg-[#f1f5f9] border border-transparent rounded-xl px-4 py-2 w-72 focus-within:bg-white focus-within:border-slate-200 focus-within:ring-4 focus-within:ring-blue-500/5 transition-all ${className}`}>
      <span className="material-symbols-outlined text-slate-400 text-xl mr-2">search</span>
      <input
        className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-400 text-[#1e293b]"
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
