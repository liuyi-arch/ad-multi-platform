
import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_DATA } from '../../mockData';
import { TimeframeSelector } from '../SortSelector';

const TrendChart: React.FC = () => {
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
    <div className="lg:col-span-2 bg-surface rounded-xl p-6 border border-border-light shadow-soft flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-lg font-bold text-text-main">流量趋势</h3>
          <p className="text-text-muted text-xs">所有墙面显示屏的每日曝光量统计</p>
        </div>
        <TimeframeSelector value={timeframe} onChange={setTimeframe} />
      </div>
      <div className="flex-1 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={displayedData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              itemStyle={{ fontWeight: 'bold' }}
            />
            <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
