
import React, { useEffect } from 'react';
import { ViewType } from '../../types';
import { Pagination, SortSelector } from '@repo/ui-components';
import AdCard from '../../components/AdCard/AdCard';
import { usePagination, useAdsStore, useModalStore, useSearch } from '@repo/hooks';
import { useSelectFilter } from '../../hooks/useSelectFilter';
import Layout from '../../components/Layout/Layout';
import MyModal from '../../components/MyModal';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Zustand Stores
  const { ads, loading, error, fetchAds, addAd, updateAd, deleteAd, updateAdStatus, incrementHeat } = useAdsStore();
  const { type, ad: modalAd, formMode, openModal, closeModal, handleConfirm: storeHandleConfirm } = useModalStore();

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const { searchQuery, setSearchQuery, searchResults: searchAds } = useSearch(ads, ['title', 'description']);

  const ITEMS_PER_PAGE = 12;
  const { activeSelect, selectFilterAds, setActiveSelect } = useSelectFilter(searchAds);

  const { currentPage, setCurrentPage, currentItems, totalPages, totalItems } = usePagination(selectFilterAds, ITEMS_PER_PAGE);

  const onSortChange = (value: string) => {
    setActiveSelect(value);
    setCurrentPage(1);
  };

  const handleViewChange = (v: ViewType) => {
    const path = v === 'GALLERY' ? '/advertiser/home' : '/advertiser/my-ads';
    navigate(path);
  };

  const handleConfirm = async (payload: any) => {
    await storeHandleConfirm(payload, {
      addAd,
      updateAd,
      deleteAd,
      updateAdStatus
    });
    // 成功后根据需要刷新或处理
  };

  return (
    <Layout
      currentView="GALLERY"
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
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="bg-white p-4 rounded-xl shadow-soft border border-slate-100 flex items-center justify-between">
            <button
              onClick={() => openModal('FORM', null, 'CREATE')}
              className="bg-[#2563eb] text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>投放新广告</span>
            </button>
            <SortSelector
              value={activeSelect}
              onChange={onSortChange}
              variant="sort"
              options={[
                { value: 'time', label: '按时间排序' },
                { value: 'bid_desc', label: '按出价降序' },
                { value: 'heat_desc', label: '按热度降序' },
              ]}
            />
          </div>

          {currentItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-300">
              <span className="material-symbols-outlined text-6xl mb-4 opacity-20">inventory_2</span>
              <p>暂无符合条件的广告</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentItems.map(ad => (
                <AdCard key={ad.id} ad={ad} onClick={(ad) => {
                  incrementHeat(ad.id);
                  openModal('DETAIL', ad);
                }} />
              ))}
            </div>
          )}

          <Pagination
            variant="float"
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
            hideOnSinglePage={false}
          />
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

export default Home;
