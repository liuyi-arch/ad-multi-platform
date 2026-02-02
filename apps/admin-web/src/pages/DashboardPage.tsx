
import React from 'react';
import StatsGrid from '../components/StatsCard';
import TrendChart from '../components/TrendChart';
import PieChart from '../components/PieChart';
import { DashboardAdTable } from '../components/AdTable';
import { AdItem } from '../types/index';
import { MOCK_STATS } from '../mockData';

interface DashboardPageProps {
  onDetailClick: (ad: AdItem) => void;
  ads: AdItem[];
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onDetailClick, ads }) => {
  return (
    <div className="space-y-8">
      <StatsGrid stats={MOCK_STATS} variant="dashboard" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TrendChart />
        <PieChart />
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
