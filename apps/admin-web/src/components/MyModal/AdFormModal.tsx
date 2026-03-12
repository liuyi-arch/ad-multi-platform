import React, { useState } from 'react';
import { AdItem } from '../../types/index';
import { Modal, VideoUploader } from '@repo/ui-components';

export const AdFormModal: React.FC<{ ad: AdItem | null; formMode: 'CREATE' | 'EDIT'; onClose: () => void; onConfirm: (data: any) => void }> = ({ ad, formMode, onClose, onConfirm }) => {
    const STORAGE_KEY = 'admin_ad_form_temp_data';

    const [formData, setFormData] = useState(() => {
        if (formMode === 'CREATE') {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            if (saved) {
                try {
                    return JSON.parse(saved);
                } catch (e) {
                    console.error('Failed to parse saved admin form data', e);
                }
            }
        }

        return {
            title: ad?.title || '',
            publisher: ad?.publisher || '',
            description: ad?.description || '',
            landingPage: ad?.landingPage || '',
            bid: (typeof ad?.bid === 'string')
                ? parseFloat((ad.bid as string).replace('¥', '').replace(',', ''))
                : (ad?.bid || 0),
            videoUrls: ad?.videoUrls || [],
        };
    });

    // 自动暂存
    React.useEffect(() => {
        if (formMode === 'CREATE') {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        }
    }, [formData, formMode]);

    const [aiLoading, setAiLoading] = useState(false);

    const handleAiSuggest = async () => {
        if (!formData.title) {
            alert("请先填写广告标题，以便 AI 生成更有针对性的文案。");
            return;
        }
        setAiLoading(true);
        // Mocking AI service
        setTimeout(() => {
            setFormData((prev: any) => ({ ...prev, description: "这是一个经过 AI 优化的高端广告文案，旨在提升点击率和转化。" }));
            setAiLoading(false);
        }, 1000);
    };

    const handleConfirmSubmit = () => {
        if (!formData.title.trim()) {
            alert('请输入广告标题');
            return;
        }
        if (!formData.description.trim()) {
            alert('请输入内容文案');
            return;
        }
        if (formData.bid <= 0) {
            alert('请输入大于 0 的有效出价');
            return;
        }
        onConfirm(formData);
        if (formMode === 'CREATE') {
            sessionStorage.removeItem(STORAGE_KEY);
        }
    };

    return (
        <Modal
            title={formMode === 'EDIT' ? '编辑广告' : '投放新广告'}
            onClose={onClose}
            onConfirm={handleConfirmSubmit}
            variant="primary"
            confirmLabel={formMode === 'EDIT' ? '保存修改' : '立即创建'}
            cancelLabel="取消"
            maxWidth="max-w-[720px]"
        >
            <div className="space-y-7">
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#1e293b]">广告标题</label>
                    <input
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm placeholder:text-slate-400"
                        placeholder="请输入广告标题"
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#1e293b]">发布人</label>
                    <input
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm placeholder:text-slate-400"
                        placeholder="请输入发布人姓名"
                        type="text"
                        value={formData.publisher}
                        onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#1e293b]">内容文案</label>
                    <div className="relative group">
                        <textarea
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm placeholder:text-slate-400 resize-none"
                            placeholder="请输入广告内容描述..."
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                        <button
                            type="button"
                            onClick={handleAiSuggest}
                            disabled={aiLoading}
                            className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-white text-primary rounded-lg text-xs font-bold hover:bg-blue-50 transition-all border border-blue-100 shadow-sm disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined text-sm">{aiLoading ? 'autorenew' : 'auto_fix'}</span>
                            {aiLoading ? 'AI 生成中...' : 'AI 优化建议'}
                        </button>
                    </div>
                </div>

                <VideoUploader
                    value={formData.videoUrls}
                    onChange={(urls) => setFormData({ ...formData, videoUrls: urls })}
                />

                <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#1e293b]">落地页</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">link</span>
                        <input
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm placeholder:text-slate-400"
                            placeholder="https://"
                            type="url"
                            value={formData.landingPage}
                            onChange={(e) => setFormData({ ...formData, landingPage: e.target.value })}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#1e293b]">出价 (CNY)</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 font-bold text-sm">¥</span>
                        <input
                            className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm font-bold tabular-nums"
                            placeholder="0.00"
                            type="number"
                            value={formData.bid || ''}
                            onChange={(e) => setFormData({ ...formData, bid: parseFloat(e.target.value) || 0 })}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};
