
import React from 'react';
import { Ad } from '../../types';
import { VideoPreview } from '@repo/ui-components';

interface AdCardProps {
  ad: Ad;
  onClick: (ad: Ad) => void;
}

const AdCard: React.FC<AdCardProps> = ({ ad, onClick }) => (
  <div
    onClick={() => onClick(ad)}
    className="group bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-lg transition-all border border-slate-100 flex flex-col cursor-pointer"
  >
    <div className="relative aspect-[16/10] overflow-hidden bg-slate-50">
      <VideoPreview
        videoUrl={ad.videoUrls?.[0]}
        posterUrl={ad.imageUrl}
        className="w-full h-full"
      />
    </div>
    <div className="p-4 flex flex-col flex-1">
      <h3 className="text-[#1e293b] text-base font-bold line-clamp-1 mb-1 group-hover:text-[#2563eb] transition-colors">{ad.title}</h3>
      <p className="text-slate-500 text-xs line-clamp-1 mb-4 h-4 leading-relaxed">{ad.description}</p>
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50">
        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="material-symbols-outlined text-base text-[#2563eb]">payments</span>
          <span className="text-xs font-bold text-[#1e293b]">¥{ad.bid.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="material-symbols-outlined text-base text-orange-500">local_fire_department</span>
          <span className="text-xs font-bold text-[#1e293b]">{(Number(ad.heat) / 1000).toFixed(1)}k</span>
        </div>
      </div>
    </div>
  </div>
);

export default AdCard;
