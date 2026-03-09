import React from 'react';
import { AdItem } from '../../types/index';
import { StatusLabel, VideoPreview } from '@repo/ui-components';

interface DashboardAdTableProps {
    ads: AdItem[];
    onDetailClick: (ad: AdItem) => void;
}

export const DashboardAdTable: React.FC<DashboardAdTableProps> = ({ ads, onDetailClick }) => {
    const topAds = ads.slice(0, 4);

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-background-base text-text-muted text-xs font-bold uppercase tracking-wider">
                    <tr>
                        <th className="px-6 py-4">广告ID</th>
                        <th className="px-6 py-4">项目名称</th>
                        <th className="px-6 py-4">状态</th>
                        <th className="px-6 py-4">出价</th>
                        <th className="px-6 py-4">热度</th>
                        <th className="px-6 py-4">查看</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                    {topAds.map((ad, idx) => (
                        <tr key={ad.id || idx} className="hover:bg-background-base/50 transition-colors">
                            <td className="px-6 py-4 font-mono text-xs text-text-muted">{ad.id}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <VideoPreview
                                        videoUrl={ad.videoUrls?.[0]}
                                        posterUrl={ad.thumbnail}
                                        className="size-10 rounded-lg border border-border-light overflow-hidden"
                                    />
                                    <div className="min-w-0 max-w-[200px]">
                                        <p className="text-sm font-bold text-text-main truncate">{ad.title.split('：')[0]}</p>
                                        <p className="text-[10px] text-text-muted truncate">
                                            {ad.description}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <StatusLabel status={ad.status} variant="table" />
                            </td>
                            <td className="px-6 py-4 text-sm font-bold text-primary">
                                {ad.bid?.toLocaleString()}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col gap-1.5">
                                    <span className="text-sm font-medium text-text-main">{ad.heat?.toLocaleString() || 0}</span>
                                    <div className="w-24 bg-background-base h-1.5 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${idx === 1 ? 'bg-emerald-500' : 'bg-primary'}`}
                                            style={{ width: `${Math.min((Number(ad.heat) || 0) / 1000 * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => onDetailClick(ad)}
                                    className="p-1.5 rounded-lg hover:bg-background-base text-text-muted transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">more_vert</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
