
import React from 'react';
import { MOCK_STATS } from '../../mockData';
import { AdStatus, ViewType } from '../../types';
import { ManagementStatsCard } from '../../components/StatsCard';
import { Pagination, Tab, SortSelector } from '@repo/ui-components';
import { ManagementAdTable } from '../../components/AdTable';
import { usePagination, useTabFilter, FilterType, useAdsData, useSearch, useAdsModal } from '@repo/hooks';
import Layout from '../../components/Layout';
import MyModal from '../../components/MyModal';

const AdManagementPage: React.FC = () => {
  const { ads, loading, error, ...dataMethods } = useAdsData();
  const { searchQuery, setSearchQuery, searchResults: searchAds } = useSearch(ads, ['id', 'title', 'description']);
  const { modal, openModal, closeModal, handleConfirm } = useAdsModal(dataMethods);

  const { activeTab, setActiveTab, tabfilterAds } = useTabFilter(searchAds);

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

  const headerAction = (
    <button
      onClick={() => openModal('FORM', null, 'CREATE')}
      className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
    >
      <span className="material-symbols-outlined text-lg">add</span>
      创建新广告
    </button>
  );

  return (
    <Layout
      title="广告库存"
      action={headerAction}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      currentNav="ad_management"
      onNavChange={() => { }} // Navigation is handled by routes, but Layout needs it. 
    >
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500 text-lg">加载中...</div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500 text-lg">加载失败: {error}</div>
        </div>
      ) : (
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
              onDetail={(ad) => openModal('DETAIL', ad)}
              onDelete={(ad) => openModal('DELETE', ad)}
              onReject={(ad) => openModal('REJECT_ACTION', ad)}
              onApprove={(ad) => openModal('APPROVE_ACTION', ad)}
              onEdit={(ad) => openModal('FORM', ad, 'EDIT')}
              onViewRejectReason={(ad) => openModal('REJECT_REASON', ad)}
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
      )}

      <MyModal
        type={modal.type}
        ad={modal.ad}
        formMode={modal.formMode}
        onClose={closeModal}
        onConfirm={handleConfirm}
      />
    </Layout>
  );
};

export default AdManagementPage;
