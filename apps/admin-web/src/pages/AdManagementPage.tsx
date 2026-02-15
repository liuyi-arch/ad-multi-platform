
import React from 'react';
import { MOCK_STATS } from '../mockData';
import { AdItem, AdStatus } from '../types';
import { ManagementStatsCard } from '../components/StatsCard';
import { Pagination, Tab, SortSelector } from '@repo/ui-components';
import { ManagementAdTable } from '../components/AdTable';
import { usePagination, useTabFilter, FilterType } from '@repo/hooks';

interface AdManagementPageProps {
  ads: AdItem[];
  onDetail: (ad: AdItem) => void;
  onDelete: (ad: AdItem) => void;
  onReject: (ad: AdItem) => void;
  onApprove: (ad: AdItem) => void;
  onEdit: (ad: AdItem) => void;
  onViewRejectReason: (ad: AdItem) => void;
}

const AdManagementPage: React.FC<AdManagementPageProps> = ({
  ads,
  onDetail,
  onDelete,
  onReject,
  onApprove,
  onEdit,
  onViewRejectReason
}) => {
  const { activeTab, setActiveTab, tabfilterAds } = useTabFilter(ads);

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    currentItems,
    totalItems,
    itemsPerPage
  } = usePagination(tabfilterAds, 5);

  const tabOptions = [
    { id: 'ALL', label: '所有广告' },
    { id: AdStatus.PENDING, label: '待审核' },
    { id: AdStatus.APPROVED, label: '已通过' },
    { id: AdStatus.REJECTED, label: '已拒绝' },
  ];

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
          options={tabOptions}
          activeId={activeTab}
          onTabChange={(id) => setActiveTab(id as FilterType)}
          variant="sharp"
          rightElement={<SortSelector variant="filter" />}
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
          variant="table"
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
