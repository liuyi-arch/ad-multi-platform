
import React from 'react';

interface StatCardProps {
  icon: string;
  label: string;
  value: number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => (
  <div className="flex items-center gap-5 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm transition-transform hover:translate-y-[-2px]">
    <div className={`size-12 rounded-xl flex items-center justify-center ${color}`}>
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </div>
    <div className="flex flex-col">
      <p className="text-slate-500 text-sm font-bold mb-0.5">{label}</p>
      <p className="text-2xl font-black text-[#1e293b] tabular-nums">{value}</p>
    </div>
  </div>
);

export default StatCard;
