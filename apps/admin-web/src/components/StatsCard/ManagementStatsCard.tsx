import React from 'react';
import { StatItem } from '../../types';

export const ManagementStatsCard: React.FC<{ stat: StatItem }> = ({ stat }) => {
    return (
        <div className="bg-surface rounded-xl p-6 border border-border-light shadow-soft transition-transform hover:translate-y-[-2px]">
            <p className="text-text-muted text-sm font-medium">{stat.label}</p>
            <div className="flex items-end justify-between mt-2">
                <p className="text-3xl font-bold text-text-main">{stat.value}</p>
                <span className={`text-sm font-bold flex items-center px-2 py-0.5 rounded border ${stat.colorClass}`}>
                    {stat.trend}
                </span>
            </div>
        </div>
    );
};
