
import React, { useState, useMemo } from 'react';
import { Ad } from '../../types';
import { Pagination, SortSelector } from '@repo/ui-components';
import AdCard from '../../components/AdCard/AdCard';
import { sortAds } from '../../utils/adHelpers';
import { usePagination } from '../../hooks/hooks';

interface HomeProps {
  ads: Ad[];
  onOpenDetail: (ad: Ad) => void;
  onOpenCreate: () => void;
}

const Home: React.FC<HomeProps> = ({ ads, onOpenDetail, onOpenCreate }) => {
  const [sortBy, setSortBy] = useState('time');
  
  const ITEMS_PER_PAGE = 12;

  const sortedAds = useMemo(() => sortAds(ads, sortBy), [ads, sortBy]);

  const { currentPage, setCurrentPage, pagedItems, totalPages } = usePagination(sortedAds, ITEMS_PER_PAGE);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-4 rounded-xl shadow-soft border border-slate-100 flex items-center justify-between">
        <button 
          onClick={onOpenCreate}
          className="bg-[#2563eb] text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          <span>投放新广告</span>
        </button>
        <SortSelector 
          value={sortBy} 
          onChange={handleSortChange}
          variant="sort"
          options={[
            { value: 'time', label: '按时间排序' },
            { value: 'bid_desc', label: '按出价降序' },
            { value: 'heat_desc', label: '按热度降序' },
          ]}
        />
      </div>

      {pagedItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-300">
          <span className="material-symbols-outlined text-6xl mb-4 opacity-20">inventory_2</span>
          <p>暂无符合条件的广告</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pagedItems.map(ad => (
            <AdCard key={ad.id} ad={ad} onClick={onOpenDetail} />
          ))}
        </div>
      )}

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

export default Home;
