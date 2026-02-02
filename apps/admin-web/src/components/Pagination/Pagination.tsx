
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }) => {
  if (totalPages === 0) return null;

  return (
    <div className="p-6 border-t border-border-light flex flex-col sm:flex-row items-center justify-between gap-6 bg-surface shrink-0">
      <p className="text-sm text-[#4c669a]">
        显示第 <span className="font-bold text-[#0d121b]">{totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> 至 <span className="font-bold text-[#0d121b]">{Math.min(currentPage * itemsPerPage, totalItems)}</span> 条，共 <span className="font-bold text-[#0d121b]">{totalItems}</span> 条记录
      </p>
      <div className="flex items-center gap-2">
        <button 
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="size-10 rounded-lg flex items-center justify-center border border-[#e7ebf3] text-[#4c669a] hover:bg-[#f6f6f8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button 
            key={page}
            onClick={() => onPageChange(page)}
            className={`size-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
              currentPage === page ? 'bg-primary text-white' : 'border border-[#e7ebf3] text-[#4c669a] hover:bg-[#f6f6f8]'
            }`}
          >
            {page}
          </button>
        ))}

        <button 
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className="size-10 rounded-lg flex items-center justify-center border border-[#e7ebf3] text-[#4c669a] hover:bg-[#f6f6f8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
