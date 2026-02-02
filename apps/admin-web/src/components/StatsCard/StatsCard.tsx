
import React from 'react';
import { StatItem } from '../../types/index';

/**
 * 仪表盘数据卡片
 */
export const DashboardStatsCard: React.FC<{ stat: StatItem }> = ({ stat }) => (
  <div className="bg-surface rounded-xl p-6 border border-border-light shadow-soft transition-transform hover:translate-y-[-2px]">
    <div className="flex justify-between items-start mb-4">
      <p className="text-text-muted text-sm font-medium">{stat.label}</p>
      <div className={`p-2 rounded-lg ${stat.colorClass}`}>
        <span className="material-symbols-outlined text-xl">{stat.icon}</span>
      </div>
    </div>
    <p className="text-3xl font-bold tracking-tight text-text-main">{stat.value}</p>
    <div className={`flex items-center gap-1 mt-2 font-medium text-sm ${stat.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
      <span className="material-symbols-outlined text-sm">
        {stat.isPositive ? 'trending_up' : 'trending_down'}
      </span>
      <span>{stat.trend}</span>
      <span className="text-text-muted font-normal ml-1">较上月</span>
    </div>
  </div>
);

/**
 * 广告管理页数据卡片
 */
export const ManagementStatsCard: React.FC<{ stat: StatItem }> = ({ stat }) => {
  const getTrendStyles = () => {
    if (stat.label === '待审核') {
      return 'text-amber-600 bg-amber-50 border-amber-100';
    }
    return stat.isPositive 
      ? 'text-emerald-600 bg-emerald-50 border-emerald-100' 
      : 'text-rose-600 bg-rose-50 border-rose-100';
  };

  return (
    <div className="bg-surface rounded-xl p-6 border border-border-light shadow-soft transition-transform hover:translate-y-[-2px]">
      <p className="text-text-muted text-sm font-medium">{stat.label}</p>
      <div className="flex items-end justify-between mt-2">
        <p className="text-3xl font-bold text-text-main">{stat.value}</p>
        <span className={`text-sm font-bold flex items-center px-2 py-0.5 rounded border ${getTrendStyles()}`}>
          {stat.trend}
        </span>
      </div>
    </div>
  );
};

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
