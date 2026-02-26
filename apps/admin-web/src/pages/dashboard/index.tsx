
import React from 'react';
import StatsGrid from '../../components/StatsCard';
import { TrendChart, PieChart } from '@repo/ui-components';
import { DashboardAdTable } from '../../components/AdTable';
import { PIE_DATA } from '../../mockData';
import { useTrendTime } from '../../hooks/useTrendTime';
import { useAdStats, useAdsData, useAdsModal, useSearch } from '@repo/hooks';
import Layout from '../../components/Layout';
import MyModal from '../../components/MyModal';

const DashboardPage: React.FC = () => {
  const { ads, loading, error, ...dataMethods } = useAdsData();
  const { searchQuery, setSearchQuery, searchResults: searchAds } = useSearch(ads, ['id', 'title', 'description']);
  const { modal, openModal, closeModal, handleConfirm } = useAdsModal(dataMethods);

  const { timeRange, setTimeRange, trendResData } = useTrendTime();
  const { stats } = useAdStats(searchAds);

  return (
    <Layout
      title="数据仪表盘"
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      currentNav="dashboard"
      onNavChange={() => { }}
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
        <div className="space-y-8">
          <StatsGrid stats={stats} variant="dashboard" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <TrendChart
              title="流量趋势"
              subtitle="所有墙面显示屏的每日曝光量统计"
              data={trendResData}
              timeframe={timeRange}
              onTimeframeChange={setTimeRange}
            />
            <PieChart
              title="广告分布"
              subtitle="按内容类别划分"
              data={PIE_DATA}
              totalValue="1,284"
            />
          </div>
          <div className="bg-surface rounded-xl border border-border-light shadow-soft overflow-hidden">
            <div className="p-6 border-b border-border-light flex justify-between items-center">
              <h3 className="text-lg font-bold text-text-main">高转化广告项目</h3>
              <button className="text-primary text-sm font-semibold hover:text-primary-hover hover:underline transition-colors">查看完整报表</button>
            </div>
            <DashboardAdTable ads={searchAds} onDetailClick={(ad) => openModal('DETAIL', ad)} />
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

export default DashboardPage;
