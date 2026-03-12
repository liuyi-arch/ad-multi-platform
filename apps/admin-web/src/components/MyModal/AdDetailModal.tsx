import React from 'react';
import { AdItem } from '../../types/index';
import { Modal, VideoPlayer } from '@repo/ui-components';

export const AdDetailModal: React.FC<{ ad: AdItem; onClose: () => void }> = ({ ad, onClose }) => {
    return (
        <Modal
            title="广告详情"
            onClose={onClose}
            variant="info"
            cancelLabel="关闭"
            maxWidth="max-w-[720px]"
        >
            <div className="space-y-6">
                {(() => {
                    const rawUrl = (ad.videoUrls && ad.videoUrls.length > 0) ? ad.videoUrls[0] : (ad.imageUrl || ad.thumbnail || '');
                    return <VideoPlayer src={rawUrl} />;
                })()}
                <h3 className="text-2xl font-bold text-[#1e293b]">{ad.title}</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4 flex flex-col gap-1 border border-blue-100">
                        <div className="flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined text-lg">payments</span>
                            <span className="text-xs font-bold uppercase tracking-wider">广告出价</span>
                        </div>
                        <p className="text-lg font-bold text-[#1e293b]">{ad.bid}</p>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-4 flex flex-col gap-1 border border-orange-100">
                        <div className="flex items-center gap-2 text-orange-600">
                            <span className="material-symbols-outlined text-lg">local_fire_department</span>
                            <span className="text-xs font-bold uppercase tracking-wider">广告热度</span>
                        </div>
                        <p className="text-lg font-bold text-[#1e293b]">{ad.heat}</p>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-4 bg-primary rounded-full"></div>
                        <h4 className="text-sm font-bold text-[#1e293b]">广告文案</h4>
                    </div>
                    <div className="space-y-4 text-[#64748b]">
                        <p className="text-sm leading-relaxed">{ad.description}</p>
                    </div>
                </div>
                {ad.status === 'REJECTED' && ad.rejectionReason && (
                    <div className="bg-rose-50 border border-rose-100 rounded-xl p-5 space-y-2">
                        <div className="flex items-center gap-2 text-rose-600">
                            <span className="material-symbols-outlined text-lg">error</span>
                            <h4 className="text-sm font-bold uppercase tracking-wider">驳回原因</h4>
                        </div>
                        <p className="text-sm text-rose-500 font-medium bg-white/50 p-3 rounded-lg border border-rose-50">
                            {ad.rejectionReason}
                        </p>
                    </div>
                )}
                {ad.landingPage && (
                    <a
                        href={ad.landingPage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-primary text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-primary/20"
                    >
                        查看详情页面
                    </a>
                )}
            </div>
        </Modal>
    );
};
