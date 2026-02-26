
import React from 'react';
import { Ad, AdStatus, ViewType } from '../../types';
import StatCard from '../../components/StatCard/StatCard';
import { Pagination, Tab } from '@repo/ui-components';
import AdTable from '../../components/AdTable/AdTable';
import { usePagination, useTabFilter, useAdStats, useAdsData, useAdsModal } from '@repo/hooks';
import Layout from '../../components/Layout';
import { AdDetailModal, AdFormModal, DeleteConfirmModal, RejectionReasonModal } from '../../components/MyModal';
import { useNavigate } from 'react-router-dom';

const MyAd: React.FC = () => {
  const navigate = useNavigate();
  const { ads, loading, error, ...dataMethods } = useAdsData();
  const { modal, openModal, closeModal, handleConfirm } = useAdsModal(dataMethods);

  const { activeTab, setActiveTab, tabfilterAds } = useTabFilter(ads);
  const { statCardState } = useAdStats(ads);
  const ITEMS_PER_PAGE = 10;

  const { currentPage, setCurrentPage, currentItems, totalPages, totalItems } = usePagination(tabfilterAds, ITEMS_PER_PAGE);

  const handleTabChange = (tab: 'ALL' | AdStatus) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleViewChange = (v: ViewType) => {
    const path = v === 'GALLERY' ? '/home' : '/my-ads';
    navigate(path);
  };

  const tabOptions = [
    { id: 'ALL', label: '全部广告' },
    { id: AdStatus.APPROVED, label: '已通过' },
    { id: AdStatus.PENDING, label: '待审核' },
    { id: AdStatus.REJECTED, label: '已拒绝' },
  ];

  return (
    <Layout
      currentView="DASHBOARD"
      onViewChange={handleViewChange}
      onSearch={() => { }} // Search not used here in current design
      searchQuery=""
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
        <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon="ads_click" label="广告总数" value={statCardState.total} color="text-blue-600 bg-blue-50" />
            <StatCard icon="check_circle" label="已通过" value={statCardState.approved} color="text-green-600 bg-green-50" />
            <StatCard icon="block" label="已拒绝" value={statCardState.rejected} color="text-red-600 bg-red-50" />
            <StatCard icon="pending" label="待审核" value={statCardState.pending} color="text-amber-600 bg-amber-50" />
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <Tab
              options={tabOptions}
              activeId={activeTab}
              onTabChange={(id) => handleTabChange(id as any)}
              variant="soft"
            />

            <AdTable
              ads={currentItems}
              onOpenEdit={(ad) => openModal('FORM', ad, 'EDIT')}
              onOpenDelete={(ad) => openModal('DELETE', ad)}
              onOpenRejection={(ad) => openModal('REJECT_REASON', ad)}
              onOpenDetail={(ad) => openModal('DETAIL', ad)}
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
      )}

      {/* Modals */}
      {modal.type === 'DETAIL' && modal.ad && (
        <AdDetailModal
          ad={modal.ad}
          onClose={closeModal}
        />
      )}

      {modal.type === 'FORM' && (
        <AdFormModal
          mode={modal.formMode}
          ad={modal.ad}
          onClose={closeModal}
          onSave={handleConfirm}
        />
      )}

      {modal.type === 'DELETE' && modal.ad && (
        <DeleteConfirmModal
          onClose={closeModal}
          onConfirm={handleConfirm}
        />
      )}

      {modal.type === 'REJECT_REASON' && modal.ad && (
        <RejectionReasonModal
          reason={modal.ad.rejectionReason || '未提供具体原因。'}
          onClose={closeModal}
        />
      )}
    </Layout>
  );
};

export default MyAd;
