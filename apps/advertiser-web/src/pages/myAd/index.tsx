
import React, { useEffect, useMemo } from 'react';
import { AdStatus, ViewType } from '../../types';
import StatCard from '../../components/StatCard/StatCard';
import { Pagination, Tab } from '@repo/ui-components';
import AdTable from '../../components/AdTable/AdTable';
import { usePagination, useTabFilter, useAdStats, useAdsStore, useModalStore, useSearch, useAuthStore } from '@repo/hooks';
import Layout from '../../components/Layout/Layout';
import MyModal from '../../components/MyModal';
import { useNavigate } from 'react-router-dom';

const MyAd: React.FC = () => {
  const navigate = useNavigate();

  // Zustand Stores
  const { ads, loading, error, fetchAds, addAd, updateAd, deleteAd, updateAdStatus, incrementHeat } = useAdsStore();
  const { user } = useAuthStore();
  const { type, ad: modalAd, formMode, openModal, closeModal, handleConfirm: storeHandleConfirm } = useModalStore();

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  // 根据当前登录手机号隔离广告，只展示“我的广告”
  const ownerPhone = user?.phone;
  const ownAds = useMemo(() =>
    ownerPhone ? ads.filter(ad => ad.publisher === ownerPhone) : ads
    , [ads, ownerPhone]);

  const { searchQuery, setSearchQuery, searchResults: searchAds } = useSearch(ownAds, ['title', 'description']);

  const { activeTab, setActiveTab, tabfilterAds } = useTabFilter(searchAds);
  const { stats } = useAdStats(ownAds);
  const ITEMS_PER_PAGE = 10;

  const { currentPage, setCurrentPage, currentItems, totalPages, totalItems, pages } = usePagination(tabfilterAds, ITEMS_PER_PAGE);

  const handleTabChange = (tab: 'ALL' | AdStatus) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleViewChange = (v: ViewType) => {
    const path = v === 'GALLERY' ? '/home' : '/my-ads';
    navigate(path);
  };

  const handleConfirm = async (payload: any) => {
    await storeHandleConfirm(payload, {
      addAd,
      updateAd,
      deleteAd,
      updateAdStatus
    });
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
      onSearch={setSearchQuery}
      searchQuery={searchQuery}
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
        <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500 max-w-[1920px] mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
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
              onOpenDetail={(ad) => {
                incrementHeat(ad.id);
                openModal('DETAIL', ad);
              }}
            />

            <Pagination
              variant="table"
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
              pages={pages}
            />
          </div>
        </div>
      )}

      <MyModal
        type={type}
        ad={modalAd}
        formMode={formMode}
        onClose={closeModal}
        onConfirm={handleConfirm}
      />
    </Layout>
  );
};

export default MyAd;
