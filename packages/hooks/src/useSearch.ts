import { useState, useMemo } from 'react';

/**
 * 通用搜索过滤 Hook
 * @param items 原始列表数据
 * @param searchFields 需要搜索的字段
 */
export function useSearch<T>(items: T[], searchFields: (keyof T)[]) {
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return items;

    return items.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field];
        if (typeof value === 'string' || typeof value === 'number') {
          return String(value).toLowerCase().includes(query);
        }
        return false;
      });
    });
  }, [items, searchQuery, searchFields]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
  };
}
