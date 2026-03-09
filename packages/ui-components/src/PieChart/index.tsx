
import React from 'react';
import { PieChart as RechartsPie, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export interface PieChartData {
  name: string;
  value: number;
  color: string;
}

export interface PieChartProps {
  title?: string;
  subtitle?: string;
  data: PieChartData[];
  totalValue?: string | number;
  className?: string;
}

export const PieChart: React.FC<PieChartProps> = ({ 
  title = "数据分布", 
  subtitle, 
  data, 
  totalValue,
  className = ""
}) => {
  return (
    <div className={`bg-surface rounded-xl p-6 border border-border-light shadow-soft ${className}`}>
      <h3 className="text-lg font-bold mb-1 text-text-main">{title}</h3>
      {subtitle && <p className="text-text-muted text-xs mb-8">{subtitle}</p>}
      <div className="h-48 relative mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPie>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </RechartsPie>
        </ResponsiveContainer>
        {totalValue && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-2xl font-bold text-text-main">{totalValue}</p>
            <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold">总计</p>
          </div>
        )}
      </div>
      <div className="space-y-3">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm font-medium text-text-main">{item.name}</span>
            </div>
            <span className="text-sm font-bold text-text-main">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
