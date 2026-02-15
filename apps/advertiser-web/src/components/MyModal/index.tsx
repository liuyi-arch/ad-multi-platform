
import React, { useState } from 'react';
import { Ad } from '../../types';
import { generateAdCopySuggestion } from '../../api/geminiService';
import { VideoUploader, VideoPlayer, Modal } from '@repo/ui-components';

export const AdFormModal: React.FC<{ 
  mode: 'CREATE' | 'EDIT'; 
  ad: Ad | null; 
  onClose: () => void; 
  onSave: (data: Partial<Ad>) => void 
}> = ({ mode, ad, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: ad?.title || '',
    publisher: ad?.publisher || '',
    description: ad?.description || '',
    bid: ad?.bid || 0,
    imageUrl: ad?.imageUrl || '',
    landingPage: ad?.landingPage || '',
    category: ad?.category || '电子商务',
  });

  const [aiLoading, setAiLoading] = useState(false);

  const handleAiSuggest = async () => {
    if (!formData.title) {
      alert("请先填写广告标题，以便 AI 生成更有针对性的文案。");
      return;
    }
    setAiLoading(true);
    const suggestion = await generateAdCopySuggestion(`${formData.title} - ${formData.description}`);
    setFormData(prev => ({ ...prev, description: suggestion }));
    setAiLoading(false);
  };

  return (
    <Modal
      title={mode === 'CREATE' ? '投放新广告' : '编辑广告'}
      onClose={onClose}
      onConfirm={() => onSave(formData)}
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

        <VideoUploader imageUrl={formData.imageUrl} />

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

export const AdDetailModal: React.FC<{ ad: Ad; onClose: () => void }> = ({ ad, onClose }) => (
  <Modal
    title="广告详情"
    onClose={onClose}
    variant="info"
    cancelLabel="关闭"
    maxWidth="max-w-[720px]"
  >
    <div className="space-y-6">
      <VideoPlayer imageUrl={ad.imageUrl} />
      <h3 className="text-2xl font-bold text-[#1e293b]">{ad.title}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-xl p-4 flex flex-col gap-1 border border-blue-100">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-lg">payments</span>
            <span className="text-xs font-bold uppercase tracking-wider">广告出价</span>
          </div>
          <p className="text-lg font-bold text-[#1e293b]">{ad.bid.toFixed(2)}<span className="text-xs font-medium text-slate-500 ml-0.5">元</span></p>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 flex flex-col gap-1 border border-orange-100">
          <div className="flex items-center gap-2 text-orange-600">
            <span className="material-symbols-outlined text-lg">local_fire_department</span>
            <span className="text-xs font-bold uppercase tracking-wider">广告热度</span>
          </div>
          <p className="text-lg font-bold text-[#1e293b]">{ad.heat.toLocaleString()} <span className="text-xs font-medium text-slate-500">热度值</span></p>
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
      {ad.landingPage && (
        <a 
          href={ad.landingPage} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full text-center bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/20"
        >
          查看详情页面
        </a>
      )}
    </div>
  </Modal>
);

export const RejectionReasonModal: React.FC<{ reason: string; onClose: () => void }> = ({ reason, onClose }) => (
  <Modal
    title="驳回原因"
    onClose={onClose}
    variant="info"
    cancelLabel="关闭"
    maxWidth="max-w-xl"
  >
    <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
      <p className="text-sm text-[#64748b] leading-relaxed">{reason}</p>
    </div>
  </Modal>
);

export const DeleteConfirmModal: React.FC<{ onClose: () => void; onConfirm: () => void }> = ({ onClose, onConfirm }) => (
  <Modal
    title="确认删除"
    onClose={onClose}
    onConfirm={onConfirm}
    variant="danger"
    confirmLabel="确认删除"
    cancelLabel="取消"
    maxWidth="max-w-[480px]"
  >
    <div>
      <p className="text-[#1e293b] font-bold text-base mb-2">您确定要删除此广告吗？</p>
      <p className="text-[#64748b] text-[15px] leading-relaxed">删除后将无法恢复。此项操作将永久从数据库中移除该广告及其关联数据。</p>
    </div>
  </Modal>
);
