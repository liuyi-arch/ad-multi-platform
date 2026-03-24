import React from 'react';
import { AdItem, AdStatus as LocalAdStatus } from '../../types/index';
import { StatusLabel, VideoPreview } from '@repo/ui-components';

interface ManagementAdTableProps {
    ads: AdItem[];
    onDetail: (ad: AdItem) => void;
    onDelete?: (ad: AdItem) => void;
    onReject?: (ad: AdItem) => void;
    onApprove?: (ad: AdItem) => void;
    onEdit?: (ad: AdItem) => void;
    onViewRejectReason?: (ad: AdItem) => void;
}

export const ManagementAdTable: React.FC<ManagementAdTableProps> = ({
    ads,
    onDetail,
    onDelete,
    onReject,
    onApprove,
    onEdit,
    onViewRejectReason
}) => {
    if (ads.length === 0) {
        return <div className="p-20 text-center text-text-muted">未找到匹配的广告数据</div>;
    }

    return (
        <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left min-w-[1000px]">
                <thead>
                    <tr className="bg-slate-50 text-text-muted uppercase text-[10px] font-bold tracking-wider whitespace-nowrap">
                        <th className="px-6 py-4 border-b border-border-light w-px">广告ID</th>
                        <th className="px-6 py-4 border-b border-border-light w-px">广告系列与标题</th>
                        <th className="px-6 py-4 border-b border-border-light w-px">状态</th>
                        <th className="px-6 py-4 border-b border-border-light w-px">创建日期</th>
                        <th className="px-6 py-4 border-b border-border-light w-px text-right">操作</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                    {ads.map((ad) => (
                        <tr key={ad.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-6 py-4 font-mono text-xs text-text-muted whitespace-nowrap">{ad.id}</td>
                            <td className="px-6 py-4 max-w-[240px] whitespace-nowrap">
                                <div className="flex items-center gap-3 overflow-hidden cursor-pointer" onClick={() => onDetail(ad)}>
                                    <VideoPreview
                                        videoUrl={ad.videoUrls?.[0]}
                                        posterUrl={ad.thumbnail}
                                        className="size-10 rounded-lg shrink-0 border border-border-light"
                                    />
                                    <div className="min-w-0 overflow-hidden">
                                        <p className="text-sm font-bold truncate text-text-main">{ad.title}</p>
                                        <p className="text-xs text-text-muted truncate">{ad.description}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <StatusLabel status={ad.status} variant="table" />
                            </td>
                            <td className="px-6 py-4 text-xs text-text-muted whitespace-nowrap">{ad.date}</td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                                    {ad.status === LocalAdStatus.PENDING && onApprove && onReject && (
                                        <>
                                            <button onClick={() => onApprove(ad)} className="bg-primary hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors shadow-sm">通过</button>
                                            <button onClick={() => onReject(ad)} className="bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 px-3 py-1.5 rounded text-xs font-bold transition-colors">驳回</button>
                                            <span className="text-slate-300 mx-1">|</span>
                                        </>
                                    )}
                                    {ad.status === LocalAdStatus.REJECTED && onViewRejectReason && (
                                        <>
                                            <button onClick={() => onViewRejectReason(ad)} className="flex items-center gap-1 text-slate-500 font-bold hover:text-slate-700 transition-colors text-sm" title="查看原因">
                                                <span className="material-symbols-outlined text-sm">info</span>
                                                原因
                                            </button>
                                            <span className="text-slate-300 mx-1">|</span>
                                        </>
                                    )}
                                    {onEdit && (
                                        <button onClick={() => onEdit(ad)} className="flex items-center gap-1 text-primary font-bold hover:text-primary/80 transition-colors text-sm">
                                            <span className="material-symbols-outlined text-sm">edit</span>
                                            编辑
                                        </button>
                                    )}
                                    {onDelete && (
                                        <>
                                            <span className="text-slate-300 mx-1">|</span>
                                            <button onClick={() => onDelete(ad)} className="flex items-center gap-1 text-red-500 font-bold hover:text-red-700 transition-colors text-sm">
                                                <span className="material-symbols-outlined text-sm">delete</span>
                                                删除
                                            </button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
