import React from 'react';
import { StatItem } from '@repo/shared-types';

interface StatCardProps {
  stat: StatItem;
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => (
  <div className="flex items-center gap-5 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm transition-transform hover:translate-y-[-2px]">
    <div className={`size-12 rounded-xl flex items-center justify-center ${stat.colorClass}`}>
      <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
    </div>
    <div className="flex flex-col">
      <p className="text-slate-500 text-sm font-bold mb-0.5">{stat.label}</p>
      <p className="text-2xl font-black text-[#1e293b] tabular-nums">{stat.value}</p>
    </div>
  </div>
);

export default StatCard;
