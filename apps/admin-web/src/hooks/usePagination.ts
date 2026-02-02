
import { useState, useMemo, useEffect } from 'react';

export const usePagination = <T>(items: T[], itemsPerPage: number = 5) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [items.length]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    currentItems,
    totalItems: items.length,
    itemsPerPage
  };
};
