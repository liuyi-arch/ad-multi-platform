
import React from 'react';

interface SearchBoxProps {
  value: string;
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onSearch, placeholder = "搜索..." }) => (
  <div className="hidden sm:flex items-center bg-[#f1f5f9] border border-transparent rounded-xl px-4 py-2 w-72 focus-within:bg-white focus-within:border-slate-200 focus-within:ring-4 focus-within:ring-blue-500/5 transition-all">
    <span className="material-symbols-outlined text-slate-400 text-xl mr-2">search</span>
    <input 
      className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-400 text-[#1e293b]" 
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={(e) => onSearch(e.target.value)}
    />
  </div>
);

export default SearchBox;
