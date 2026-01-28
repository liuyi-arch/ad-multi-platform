
import React from 'react';

interface HomePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const HomePagination: React.FC<HomePaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 pt-10">
      <button 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="size-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined text-xl">chevron_left</span>
      </button>
      
      {[...Array(totalPages)].map((_, i) => (
        <button 
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`size-9 flex items-center justify-center text-sm font-bold rounded-lg transition-all ${currentPage === i + 1 ? 'bg-[#2563eb] text-white shadow-md shadow-blue-500/20' : 'border border-slate-200 text-slate-500 hover:bg-slate-50'}`}
        >
          {i + 1}
        </button>
      ))}
      
      <button 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="size-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined text-xl">chevron_right</span>
      </button>
    </div>
  );
};

export default HomePagination;
