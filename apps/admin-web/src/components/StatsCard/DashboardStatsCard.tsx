import React from 'react';
import { StatItem } from '../../types';

export const DashboardStatsCard: React.FC<{ stat: StatItem }> = ({ stat }) => (
    <div className="bg-surface rounded-xl p-6 border border-border-light shadow-soft transition-transform hover:translate-y-[-2px]">
        <div className="flex justify-between items-start mb-4">
            <p className="text-text-muted text-sm font-medium">{stat.label}</p>
            <div className={`p-2 rounded-lg ${stat.colorClass}`}>
                <span className="material-symbols-outlined !text-3xl">{stat.icon}</span>
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
