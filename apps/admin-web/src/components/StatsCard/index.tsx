import React from 'react';
import { StatItem } from '../../types/index';
import { DashboardStatsCard } from './DashboardStatsCard';
import { ManagementStatsCard } from './ManagementStatsCard';

// 保持向后兼容的网格容器
interface StatsGridProps {
  stats: StatItem[];
  variant?: 'dashboard' | 'management';
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats, variant = 'management' }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {stats.map((stat, idx) => (
      variant === 'dashboard'
        ? <DashboardStatsCard key={idx} stat={stat} />
        : <ManagementStatsCard key={idx} stat={stat} />
    ))}
  </div>
);

export default StatsGrid;
export { DashboardStatsCard, ManagementStatsCard };
