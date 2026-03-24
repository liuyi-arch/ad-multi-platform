import React, { useState } from 'react';
import { Ad } from '../../types';
import { generateAdCopySuggestion } from '../../api/geminiService';
import { VideoUploader, Modal } from '@repo/ui-components';

export const AdFormModal: React.FC<{
    mode: 'CREATE' | 'EDIT';
    ad: Ad | null;
    onClose: () => void;
    onSave: (data: Partial<Ad>) => void
}> = ({ mode, ad, onClose, onSave }) => {
    const STORAGE_KEY = 'ad_form_temp_data';

    const [formData, setFormData] = useState(() => {
        // 优先从 sessionStorage 恢复
        if (mode === 'CREATE') {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            if (saved) {
                try {
                    return JSON.parse(saved);
                } catch (e) {
                    console.error('Failed to parse saved form data', e);
                }
            }
        }

        return {
            title: ad?.title || '',
            publisher: ad?.publisher || '',
            description: ad?.description || '',
            category: ad?.category || '电子商务',
            bid: (typeof ad?.bid === 'string')
                ? parseFloat((ad.bid as string).replace('¥', '').replace(',', ''))
                : (ad?.bid || 0),
            imageUrl: ad?.imageUrl || '',
            videoUrls: ad?.videoUrls || [],
            landingPage: ad?.landingPage || '',
        };
    });

    // 自动暂存到 sessionStorage
    React.useEffect(() => {
        if (mode === 'CREATE') {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        }
    }, [formData, mode]);

    const handleConfirmSave = () => {
        onSave(formData);
        if (mode === 'CREATE') {
            sessionStorage.removeItem(STORAGE_KEY);
        }
    };

    const [aiLoading, setAiLoading] = useState(false);

    const handleAiSuggest = async () => {
        if (!formData.title) {
            alert("请先填写广告标题，以便 AI 生成更有针对性的文案。");
            return;
        }
        setAiLoading(true);
        const suggestion = await generateAdCopySuggestion(`${formData.title} - ${formData.description}`);
        setFormData((prev: any) => ({ ...prev, description: suggestion }));
        setAiLoading(false);
    };

    return (
        <Modal
            title={mode === 'CREATE' ? '投放新广告' : '编辑广告'}
            onClose={onClose}
            onConfirm={handleConfirmSave}
            variant="primary"
            confirmLabel={mode === 'CREATE' ? '创建广告' : '保存修改'}
            cancelLabel="取消"
            maxWidth="max-w-[720px]"
        >
            <div className="space-y-7">
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#1e293b]">广告标题</label>
                    <input
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm placeholder:text-slate-400"
                        placeholder="输入广告名称"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#1e293b]">发布人</label>
                    <input
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm placeholder:text-slate-400"
                        placeholder="署名或机构名称"
                        value={formData.publisher}
                        onChange={e => setFormData({ ...formData, publisher: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#1e293b]">内容文案</label>
                    <div className="relative group">
                        <textarea
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm placeholder:text-slate-400 resize-none"
                            placeholder="编写吸引人的广告语..."
                            rows={4}
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
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
                    onChange={urls => setFormData({ ...formData, videoUrls: urls })}
                />

                <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#1e293b]">落地页</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">link</span>
                        <input
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm placeholder:text-slate-400"
                            placeholder="https://..."
                            value={formData.landingPage}
                            onChange={e => setFormData({ ...formData, landingPage: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#1e293b]">出价</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 font-bold text-sm">¥</span>
                        <input
                            type="number"
                            className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm font-bold tabular-nums"
                            placeholder="0.00"
                            value={formData.bid || ''}
                            onChange={e => setFormData({ ...formData, bid: Number(e.target.value) })}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};
