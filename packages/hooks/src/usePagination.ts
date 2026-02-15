
import { useState, useMemo, useEffect } from 'react';

/**
 * 通用分页逻辑 Hook
 */
export function usePagination<T>(items: T[], itemsPerPage: number = 5) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  // 当列表长度变化时（如过滤后），重置到第一页
  useEffect(() => {
    setCurrentPage(1);
  }, [items.length]);

  return {
    currentPage,
    setCurrentPage,
    currentItems,
    totalPages,
    totalItems: items.length,
    itemsPerPage
  };
}
