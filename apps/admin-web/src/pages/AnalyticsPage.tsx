
import React from 'react';
import { TrendChart, PieChart } from '@repo/ui-components';
import { PIE_DATA } from '../mockData';
import { useTrendTime } from '../hooks/useTrendTime';

const AnalyticsPage: React.FC = () => {
  const { timeRange, setTimeRange, trendResData } = useTrendTime();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-text-main">深度数据分析</h2>
          <p className="text-sm text-text-muted">实时监控各广告位的投放效果</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-border-light px-4 py-2 rounded-lg text-sm font-bold text-text-main hover:bg-slate-50">导出报表</button>
          <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-hover">刷新数据</button>
        </div>
      </div>

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

      <div className="bg-surface rounded-xl border border-border-light p-6 shadow-soft">
        <h3 className="font-bold text-lg mb-4">详细投放报表</h3>
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-lg text-text-muted">
          此处集成更详细的数据网格组件
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
