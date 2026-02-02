
import React, { useState, useMemo } from 'react';
import { MOCK_STATS } from '../mockData';
import { AdItem, AdStatus } from '../types';
import { ManagementStatsCard } from '../components/StatsCard';
import Tab from '../components/Tab';
import { ManagementAdTable } from '../components/AdTable';
import Pagination from '../components/Pagination';
import { usePagination } from '../hooks/usePagination';

interface AdManagementPageProps {
  ads: AdItem[];
  onDetail: (ad: AdItem) => void;
  onDelete: (ad: AdItem) => void;
  onReject: (ad: AdItem) => void;
  onApprove: (ad: AdItem) => void;
  onEdit: (ad: AdItem) => void;
  onViewRejectReason: (ad: AdItem) => void;
}

type FilterType = 'ALL' | AdStatus;

const AdManagementPage: React.FC<AdManagementPageProps> = ({
  ads,
  onDetail,
  onDelete,
  onReject,
  onApprove,
  onEdit,
  onViewRejectReason
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');

  const filteredByStatus = useMemo(() => {
    if (activeFilter === 'ALL') return ads;
    return ads.filter(ad => ad.status === activeFilter);
  }, [ads, activeFilter]);

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    currentItems,
    totalItems,
    itemsPerPage
  } = usePagination(filteredByStatus, 5);

  return (
    <div className="space-y-6">
      <nav className="flex text-sm text-text-muted gap-2">
        <span className="hover:text-primary transition-colors cursor-pointer">仪表盘</span>
        <span>/</span>
        <span className="text-text-main font-medium">广告管理</span>
      </nav>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_STATS.map((stat, idx) => (
          <ManagementStatsCard key={idx} stat={stat} />
        ))}
      </div>

      <div className="bg-surface border border-border-light shadow-soft rounded-xl overflow-hidden flex flex-col">
        <Tab
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <ManagementAdTable
          ads={currentItems}
          onDetail={onDetail}
          onDelete={onDelete}
          onReject={onReject}
          onApprove={onApprove}
          onEdit={onEdit}
          onViewRejectReason={onViewRejectReason}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AdManagementPage;
