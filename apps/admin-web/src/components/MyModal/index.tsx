
import React from 'react';
import { AdItem, ModalType } from '../../types/index';
import { Modal, VideoPlayer, VideoUploader } from '@repo/ui-components';

/**
 * 广告详情弹窗
 */
export const DetailModal: React.FC<{ ad: AdItem; onClose: () => void }> = ({ ad, onClose }) => {
  return (
    <Modal
      title="广告详情"
      onClose={onClose}
      variant="info"
      cancelLabel="关闭"
      maxWidth="max-w-[720px]"
    >
      <div className="space-y-6">
        <VideoPlayer imageUrl={(ad.videoUrls && ad.videoUrls.length > 0) ? ad.videoUrls[0] : (ad.imageUrl || ad.thumbnail || '')} />
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
            className="block w-full text-center bg-primary text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-primary/20"
          >
            查看详情页面
          </a>
        )}
      </div>
    </Modal>
  );
};

/**
 * 删除确认弹窗
 */
export const DeleteModal: React.FC<{ ad: AdItem; onClose: () => void; onConfirm: () => void }> = ({ ad, onClose, onConfirm }) => (
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

/**
 * 驳回操作弹窗
 */
export const RejectActionModal: React.FC<{ onClose: () => void; onConfirm: (reason: string) => void }> = ({ onClose, onConfirm }) => {
  const [reason, setReason] = React.useState('');
  return (
    <Modal
      title="驳回理由"
      onClose={onClose}
      onConfirm={() => onConfirm(reason)}
      variant="danger"
      confirmLabel="确认驳回"
      cancelLabel="取消"
      maxWidth="max-w-[480px]"
    >
      <div className="space-y-2">
        <label className="block text-sm font-bold text-text-main">驳回原因</label>
        <textarea
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm placeholder:text-slate-400 min-h-[160px] resize-none"
          placeholder="请填写驳回原因，以便广告主修改..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>
    </Modal>
  );
};

/**
 * 通过确认弹窗
 */
export const ApproveActionModal: React.FC<{ onClose: () => void; onConfirm: () => void }> = ({ onClose, onConfirm }) => (
  <Modal
    title="确认通过"
    onClose={onClose}
    onConfirm={onConfirm}
    variant="primary"
    confirmLabel="确认通过"
    cancelLabel="取消"
    maxWidth="max-w-[480px]"
  >
    <p className="text-base text-[#1e293b]">您确定要通过该广告申请吗？通过后广告将正式投放展示。</p>
  </Modal>
);

/**
 * 查看驳回原因弹窗
 */
export const RejectReasonModal: React.FC<{ onClose: () => void; onConfirm: (reason: string) => void }> = ({ onClose, onConfirm }) => {
  const [reason, setReason] = React.useState('广告图不清晰');
  return (
    <Modal
      title="驳回原因"
      onClose={onClose}
      onConfirm={() => onConfirm(reason)}
      variant="primary"
      confirmLabel="保存修改"
      cancelLabel="取消"
      maxWidth="max-w-lg"
    >
      <div>
        <label className="block text-sm font-bold text-[#1e293b] mb-2">修改驳回理由</label>
        <textarea
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm placeholder:text-slate-400 h-32 resize-none"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <p className="mt-2 text-xs text-slate-400 flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">info</span>该理由将展示给广告主
        </p>
      </div>
    </Modal>
  );
};

/**
 * 广告创建/编辑表单弹窗
 */
export const AdFormModal: React.FC<{ ad: AdItem | null; formMode: 'CREATE' | 'EDIT'; onClose: () => void; onConfirm: (data: any) => void }> = ({ ad, formMode, onClose, onConfirm }) => {
  const [formData, setFormData] = React.useState({
    title: ad?.title || '',
    publisher: ad?.publisher || '',
    description: ad?.description || '',
    landingPage: ad?.landingPage || '',
    bid: ad?.bid || 0,
    videoUrls: ad?.videoUrls || [],
  });

  const [aiLoading, setAiLoading] = React.useState(false);

  const handleAiSuggest = async () => {
    if (!formData.title) {
      alert("请先填写广告标题，以便 AI 生成更有针对性的文案。");
      return;
    }
    setAiLoading(true);
    // Mocking AI service
    setTimeout(() => {
      setFormData(prev => ({ ...prev, description: "这是一个经过 AI 优化的高端广告文案，旨在提升点击率和转化。" }));
      setAiLoading(false);
    }, 1000);
  };

  return (
    <Modal
      title={formMode === 'EDIT' ? '编辑广告' : '投放新广告'}
      onClose={onClose}
      onConfirm={() => onConfirm(formData)}
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

/**
 * 统一弹窗入口组件
 */
const MyModal: React.FC<{
  type: ModalType;
  ad: AdItem | null;
  formMode: 'CREATE' | 'EDIT';
  onClose: () => void;
  onConfirm: (data?: any) => void
}> = ({ type, ad, formMode, onClose, onConfirm }) => {
  if (!type) return null;
  switch (type) {
    case 'DETAIL': return ad ? <DetailModal ad={ad} onClose={onClose} /> : null;
    case 'DELETE': return ad ? <DeleteModal ad={ad} onClose={onClose} onConfirm={onConfirm} /> : null;
    case 'REJECT_ACTION': return <RejectActionModal onClose={onClose} onConfirm={onConfirm} />;
    case 'APPROVE_ACTION': return <ApproveActionModal onClose={onClose} onConfirm={onConfirm} />;
    case 'REJECT_REASON': return <RejectReasonModal onClose={onClose} onConfirm={onConfirm} />;
    case 'FORM': return <AdFormModal ad={ad} formMode={formMode} onClose={onClose} onConfirm={onConfirm} />;
    default: return null;
  }
};

export default MyModal;
