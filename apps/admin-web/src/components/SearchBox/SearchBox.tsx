
import React from 'react';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange, placeholder = "搜索广告ID或标题..." }) => {
  return (
    <div className="relative flex-1 max-w-md ml-4">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="material-symbols-outlined text-text-muted text-xl">search</span>
      </div>
      <input
        className="w-full bg-background-base border border-border-light rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all text-text-main placeholder-text-muted/60 outline-none"
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
