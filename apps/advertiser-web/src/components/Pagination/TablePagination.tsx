
import React from 'react';

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage, 
  onPageChange 
}) => {
  if (totalPages === 0) return null;

  return (
    <div className="px-8 py-6 border-t border-slate-50 flex items-center justify-between">
      <p className="text-sm text-slate-500 font-medium">
        显示第 <span className="text-[#1e293b] font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> 至 <span className="text-[#1e293b] font-bold">{Math.min(currentPage * itemsPerPage, totalItems)}</span> 条，共 <span className="text-[#1e293b] font-bold">{totalItems}</span> 条记录
      </p>
      <div className="flex items-center gap-2">
        <button 
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="size-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors disabled:opacity-50"
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
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className="size-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-xl">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
