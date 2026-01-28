
import { useState, useMemo } from 'react';

interface PaginationResult<T> {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pagedItems: T[];
  totalPages: number;
  totalItems: number;
}

export function usePagination<T>(items: T[], itemsPerPage: number): PaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  const pagedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  return {
    currentPage,
    setCurrentPage,
    pagedItems,
    totalPages,
    totalItems: items.length
  };
}
