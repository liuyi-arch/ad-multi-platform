
import React, { useState, useMemo } from 'react';
import { Ad, AdStatus } from '../../types';
import StatCard from '../../components/StatCard/StatCard';
import { Pagination, Tab } from '@repo/ui-components';
import AdTable from '../../components/AdTable/AdTable';
import { usePagination } from '../../hooks/hooks';

interface MyAdProps {
  ads: Ad[];
  onOpenEdit: (ad: Ad) => void;
  onOpenDelete: (ad: Ad) => void;
  onOpenRejection: (ad: Ad) => void;
  onOpenDetail: (ad: Ad) => void;
}

const MyAd: React.FC<MyAdProps> = ({ ads, onOpenEdit, onOpenDelete, onOpenRejection, onOpenDetail }) => {
  const [activeTab, setActiveTab] = useState<'ALL' | AdStatus>('ALL');
  const ITEMS_PER_PAGE = 10;

  const stats = useMemo(() => ({
    total: ads.length,
    approved: ads.filter(a => a.status === AdStatus.APPROVED).length,
    rejected: ads.filter(a => a.status === AdStatus.REJECTED).length,
    pending: ads.filter(a => a.status === AdStatus.PENDING).length,
  }), [ads]);

  const filteredAds = useMemo(() => {
    return activeTab === 'ALL' ? ads : ads.filter(a => a.status === activeTab);
  }, [ads, activeTab]);

  const { currentPage, setCurrentPage, pagedItems, totalPages, totalItems } = usePagination(filteredAds, ITEMS_PER_PAGE);

  const handleTabChange = (tab: 'ALL' | AdStatus) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const tabOptions = [
    { id: 'ALL', label: '全部广告' },
    { id: AdStatus.APPROVED, label: '已通过' },
    { id: AdStatus.PENDING, label: '待审核' },
    { id: AdStatus.REJECTED, label: '已拒绝' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon="ads_click" label="广告总数" value={stats.total} color="text-blue-600 bg-blue-50" />
        <StatCard icon="check_circle" label="已通过" value={stats.approved} color="text-green-600 bg-green-50" />
        <StatCard icon="block" label="已拒绝" value={stats.rejected} color="text-red-600 bg-red-50" />
        <StatCard icon="pending" label="待审核" value={stats.pending} color="text-amber-600 bg-amber-50" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <Tab 
          options={tabOptions} 
          activeId={activeTab} 
          onTabChange={(id) => handleTabChange(id as any)} 
          variant="soft"
        />
        
        <AdTable 
          ads={pagedItems} 
          onOpenEdit={onOpenEdit}
          onOpenDelete={onOpenDelete}
          onOpenRejection={onOpenRejection}
          onOpenDetail={onOpenDetail}
        />

        <Pagination 
          variant="table"
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default MyAd;
