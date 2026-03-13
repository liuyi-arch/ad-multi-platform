
import React from 'react';
import { Ad, AdStatus } from '../../types';
import { StatusLabel, VideoPreview } from '@repo/ui-components';

interface AdTableProps {
  ads: Ad[];
  onOpenEdit: (ad: Ad) => void;
  onOpenDelete: (ad: Ad) => void;
  onOpenRejection: (ad: Ad) => void;
  onOpenDetail: (ad: Ad) => void;
}

const AdTable: React.FC<AdTableProps> = ({ ads, onOpenEdit, onOpenDelete, onOpenRejection, onOpenDetail }) => (
  <div className="overflow-x-auto w-full">
    <table className="w-full text-left min-w-[1240px]">
      <thead>
        <tr className="border-b border-slate-50">
          <th className="px-8 py-5 text-slate-500 text-xs font-bold uppercase tracking-wider">广告ID</th>
          <th className="px-8 py-5 text-slate-500 text-xs font-bold uppercase tracking-wider">广告详情</th>
          <th className="px-8 py-5 text-slate-500 text-xs font-bold uppercase tracking-wider">创建日期</th>
          <th className="px-8 py-5 text-slate-500 text-xs font-bold uppercase tracking-wider">状态</th>
          <th className="px-8 py-5 text-slate-500 text-xs font-bold uppercase tracking-wider text-right">操作</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {ads.map(ad => (
          <tr key={ad.id} className="hover:bg-slate-50/50 transition-colors group">
            <td className="px-8 py-6 font-mono text-xs text-slate-400">{ad.id}</td>
            <td className="px-8 py-6">
              <div className="flex items-center gap-4">
                <VideoPreview
                  videoUrl={ad.videoUrls?.[0]}
                  posterUrl={ad.imageUrl}
                  className="h-14 w-20 rounded-xl shrink-0 shadow-sm border border-slate-200"
                  onClick={() => onOpenDetail(ad)}
                />
                <div className="flex-1 min-w-0 max-w-[240px]">
                  <p className="text-[#1e293b] font-bold text-sm mb-0.5 line-clamp-1">{ad.title}</p>
                  <p className="text-slate-400 text-xs line-clamp-1">{ad.description}</p>
                </div>
              </div>
            </td>
            <td className="px-8 py-6 text-slate-500 text-sm font-medium">{ad.createDate}</td>
            <td className="px-8 py-6">
              <div className="flex items-center gap-2">
                <StatusLabel status={ad.status} />
              </div>
            </td>
            <td className="px-8 py-6 text-right">
              <div className="flex justify-end items-center gap-4 flex-wrap">
                {ad.status === AdStatus.REJECTED && (
                  <>
                    <button
                      onClick={() => onOpenRejection(ad)}
                      className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 font-bold text-sm transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">info</span>
                      原因
                    </button>
                    <div className="w-px h-3 bg-slate-200"></div>
                  </>
                )}
                <button
                  onClick={() => onOpenEdit(ad)}
                  className="flex items-center gap-1.5 text-[#2563eb] hover:text-blue-700 font-bold text-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-base">edit</span>
                  编辑
                </button>
                <div className="w-px h-3 bg-slate-200"></div>
                <button
                  onClick={() => onOpenDelete(ad)}
                  className="flex items-center gap-1.5 text-red-500 hover:text-red-600 font-bold text-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                  删除
                </button>
              </div>
            </td>
          </tr>
        ))}
        {ads.length === 0 && (
          <tr>
            <td colSpan={5} className="px-8 py-20 text-center">
              <div className="flex flex-col items-center gap-2 opacity-20">
                <span className="material-symbols-outlined text-5xl">inventory_2</span>
                <p className="text-sm font-bold">暂无相关广告记录</p>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div >
);

export default AdTable;
