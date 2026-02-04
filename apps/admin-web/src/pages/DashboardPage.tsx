
import React, { useState, useMemo } from 'react';
import StatsGrid from '../components/StatsCard';
import { TrendChart, PieChart } from '@repo/ui-components';
import { DashboardAdTable } from '../components/AdTable';
import { AdItem } from '../types/index';
import { MOCK_STATS, CHART_DATA, PIE_DATA } from '../mockData';

interface DashboardPageProps {
  onDetailClick: (ad: AdItem) => void;
  ads: AdItem[];
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onDetailClick, ads }) => {
  const [timeframe, setTimeframe] = useState('1m');

  // 模拟基于时间范围的数据处理
  const displayedData = useMemo(() => {
    if (timeframe === '7d') return CHART_DATA.slice(0, 3); // 简化模拟
    if (timeframe === '3m') {
      // 模拟更长的数据
      return [
        ...CHART_DATA.map(d => ({ ...d, name: '9月' + d.name.split('10月')[1] })),
        ...CHART_DATA
      ];
    }
    return CHART_DATA;
  }, [timeframe]);

  return (
    <div className="space-y-8">
      <StatsGrid stats={MOCK_STATS} variant="dashboard" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TrendChart 
          title="流量趋势"
          subtitle="所有墙面显示屏的每日曝光量统计"
          data={displayedData}
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
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
        <DashboardAdTable ads={ads} onDetailClick={onDetailClick} />
      </div>
    </div>
  );
};

export default DashboardPage;
