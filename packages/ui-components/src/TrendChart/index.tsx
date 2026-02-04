
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SortSelector } from '../SortSelector';

export interface TrendChartData {
  name: string;
  value: number;
}

export interface TrendChartProps {
  title?: string;
  subtitle?: string;
  data: TrendChartData[];
  timeframe: string;
  onTimeframeChange: (value: string) => void;
  timeframeOptions?: { value: string; label: string }[];
  className?: string;
}

export const TrendChart: React.FC<TrendChartProps> = ({ 
  title = "趋势统计", 
  subtitle, 
  data, 
  timeframe,
  onTimeframeChange,
  timeframeOptions = [
    { value: '7d', label: '最近 7 天' },
    { value: '1m', label: '最近 30 天' },
    { value: '3m', label: '最近 90 天' },
  ],
  className = ""
}) => {
  return (
    <div className={`lg:col-span-2 bg-surface rounded-xl p-6 border border-border-light shadow-soft flex flex-col ${className}`}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-lg font-bold text-text-main">{title}</h3>
          {subtitle && <p className="text-text-muted text-xs">{subtitle}</p>}
        </div>
        <SortSelector 
          value={timeframe} 
          onChange={onTimeframeChange} 
          variant="select"
          options={timeframeOptions}
        />
      </div>
      <div className="flex-1 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
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
