
import React from 'react';
import { AdItem, AdStatus, ModalType } from '../../types/index';

/**
 * 基础弹窗包装组件
 */
const ModalWrapper: React.FC<{ children: React.ReactNode; maxWidth?: string; onClose: () => void }> = ({ children, maxWidth = "max-w-xl", onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}></div>
    <div className={`relative bg-surface w-full ${maxWidth} rounded-2xl shadow-soft flex flex-col overflow-hidden max-h-[90vh] animate-in zoom-in duration-200`}>
      {children}
    </div>
  </div>
);

/**
 * 广告详情弹窗
 */
export const DetailModal: React.FC<{ ad: AdItem; onClose: () => void }> = ({ ad, onClose }) => (
  <ModalWrapper maxWidth="max-w-[640px]" onClose={onClose}>
    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
      <h3 className="text-lg font-bold text-[#1e293b]">广告详情</h3>
      <button onClick={onClose} className="p-1 rounded-md text-text-muted hover:text-text-main hover:bg-slate-100 transition-all">
        <span className="material-symbols-outlined block">close</span>
      </button>
    </div>
    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
      <div className="aspect-video bg-black rounded-xl overflow-hidden relative border border-slate-100 shadow-inner">
        <img alt="Ad Background" className="w-full h-full object-cover" src={ad.thumbnail} />
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="size-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30"><span className="material-symbols-outlined text-4xl">play_arrow</span></button>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-[#1e293b]">{ad.title}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">广告出价</p>
          <p className="text-lg font-bold text-blue-900">¥{ad.bid.toFixed(2)}</p>
        </div>
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
          <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-1">广告热度</p>
          <p className="text-lg font-bold text-orange-900">{ad.heat}</p>
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-[#1e293b] flex items-center gap-2"><span className="w-1 h-4 bg-primary rounded-full"></span>广告文案</h4>
        <p className="text-sm text-[#64748b] leading-relaxed">{ad.description}</p>
      </div>
    </div>
    <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-white shrink-0">
      <button onClick={onClose} className="h-11 min-w-[120px] px-6 text-sm font-bold rounded-lg transition-colors bg-[#e7ebf3] hover:bg-[#dbe1ee] text-[#0d121b]">关闭</button>
    </div>
  </ModalWrapper>
);

/**
 * 删除确认弹窗
 */
export const DeleteModal: React.FC<{ ad: AdItem; onClose: () => void; onConfirm: () => void }> = ({ ad, onClose, onConfirm }) => (
  <ModalWrapper maxWidth="max-w-[480px]" onClose={onClose}>
    <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
      <h3 className="text-lg font-bold text-[#1e293b]">确认删除</h3>
      <button onClick={onClose} className="p-1 rounded-md text-text-muted hover:text-text-main hover:bg-slate-100 transition-all">
        <span className="material-symbols-outlined block">close</span>
      </button>
    </div>
    <div className="p-6">
      <p className="text-base font-bold text-[#1e293b]">您确定要删除此广告吗？</p>
      <p className="text-sm text-[#64748b] mt-2 font-medium">广告 ID: <span className="font-mono text-primary">{ad.id}</span></p>
      <p className="text-sm text-[#64748b] mt-2">删除后将无法恢复，此操作将永久移除该数据。</p>
    </div>
    <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-white shrink-0">
      <button onClick={onClose} className="h-11 min-w-[120px] px-6 text-sm font-bold rounded-lg transition-colors bg-[#e7ebf3] hover:bg-[#dbe1ee] text-[#0d121b]">取消</button>
      <button onClick={onConfirm} className="px-8 py-2.5 bg-[#ef4444] text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-red-500/20">确认删除</button>
    </div>
  </ModalWrapper>
);

/**
 * 驳回操作弹窗
 */
export const RejectActionModal: React.FC<{ onClose: () => void; onConfirm: (reason: string) => void }> = ({ onClose, onConfirm }) => {
  const [reason, setReason] = React.useState('');
  return (
    <ModalWrapper maxWidth="max-w-[480px]" onClose={onClose}>
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#1e293b]">驳回理由</h3>
        <button onClick={onClose} className="p-1 rounded-md text-text-muted hover:text-text-main hover:bg-slate-100 transition-all">
          <span className="material-symbols-outlined block">close</span>
        </button>
      </div>
      <div className="p-6 space-y-2">
        <label className="block text-sm font-bold text-text-main">驳回原因</label>
        <textarea
          className="form-input min-h-[160px] resize-none"
          placeholder="请填写驳回原因，以便广告主修改..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>
      <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-white shrink-0">
        <button onClick={onClose} className="h-11 min-w-[120px] px-6 text-sm font-bold rounded-lg transition-colors bg-[#e7ebf3] hover:bg-[#dbe1ee] text-[#0d121b]">取消</button>
        <button onClick={() => onConfirm(reason)} className="px-8 py-2.5 bg-[#ef4444] text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-red-500/20">确认驳回</button>
      </div>
    </ModalWrapper>
  );
};

/**
 * 通过确认弹窗
 */
export const ApproveActionModal: React.FC<{ onClose: () => void; onConfirm: () => void }> = ({ onClose, onConfirm }) => (
  <ModalWrapper maxWidth="max-w-[480px]" onClose={onClose}>
    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
      <h3 className="text-lg font-bold text-[#1e293b]">确认通过</h3>
      <button onClick={onClose} className="p-1 rounded-md text-text-muted hover:text-text-main hover:bg-slate-100 transition-all">
        <span className="material-symbols-outlined block">close</span>
      </button>
    </div>
    <div className="p-6">
      <p className="text-base text-[#1e293b]">您确定要通过该广告申请吗？通过后广告将正式投放展示。</p>
    </div>
    <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-white shrink-0">
      <button onClick={onClose} className="h-11 min-w-[120px] px-6 text-sm font-bold rounded-lg transition-colors bg-[#e7ebf3] hover:bg-[#dbe1ee] text-[#0d121b]">取消</button>
      <button onClick={onConfirm} className="px-8 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20">确认通过</button>
    </div>
  </ModalWrapper>
);

/**
 * 查看驳回原因弹窗
 */
export const RejectReasonModal: React.FC<{ onClose: () => void; onConfirm: (reason: string) => void }> = ({ onClose, onConfirm }) => {
  const [reason, setReason] = React.useState('广告图不清晰');
  return (
    <ModalWrapper maxWidth="max-w-lg" onClose={onClose}>
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#1e293b]">驳回原因</h3>
        <button onClick={onClose} className="p-1 rounded-md text-text-muted hover:text-text-main hover:bg-slate-100 transition-all">
          <span className="material-symbols-outlined block">close</span>
        </button>
      </div>
      <div className="p-6">
        <label className="form-label">修改驳回理由</label>
        <textarea
          className="form-input h-32 resize-none"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <p className="mt-2 text-xs text-slate-400 flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">info</span>该理由将展示给广告主
        </p>
      </div>
      <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-white shrink-0">
        <button onClick={onClose} className="h-11 min-w-[120px] px-6 text-sm font-bold rounded-lg transition-colors bg-[#e7ebf3] hover:bg-[#dbe1ee] text-[#0d121b]">取消</button>
        <button onClick={() => onConfirm(reason)} className="px-8 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20">保存修改</button>
      </div>
    </ModalWrapper>
  );
};

/**
 * 广告创建/编辑表单弹窗
 */
export const AdFormModal: React.FC<{ ad: AdItem | null; formMode: 'create' | 'edit'; onClose: () => void; onConfirm: (data: any) => void }> = ({ ad, formMode, onClose, onConfirm }) => {
  const [formData, setFormData] = React.useState({
    title: ad?.title || '',
    publisher: ad?.publisher || 'Alex Rivera',
    description: ad?.description || '',
    landingPage: ad?.landingPage || '',
    bid: ad?.bid || 0,
  });

  return (
    <ModalWrapper maxWidth="max-w-xl" onClose={onClose}>
      <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
        <h3 className="text-lg font-bold text-[#1e293b]">{formMode === 'edit' ? '编辑广告' : '创建新广告'}</h3>
        <button onClick={onClose} className="p-1 rounded-md text-text-muted hover:text-text-main hover:bg-slate-100 transition-all">
          <span className="material-symbols-outlined block">close</span>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-5 custom-scrollbar">
        <div>
          <label className="form-label">广告标题</label>
          <input className="form-input" placeholder="请输入广告标题" type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
        </div>
        <div>
          <label className="form-label">发布人</label>
          <input className="form-input" placeholder="请输入发布人姓名" type="text" value={formData.publisher} onChange={(e) => setFormData({...formData, publisher: e.target.value})} />
        </div>
        <div>
          <label className="form-label">内容文案</label>
          <textarea className="form-input resize-none" placeholder="请输入广告内容描述..." rows={4} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
        </div>
        <div>
          <label className="form-label">上传视频 (最多3个)</label>
          <div className="flex gap-3">
            <div className="relative size-20 rounded-lg border border-border-light overflow-hidden bg-slate-100 group">
              <img alt="Thumbnail" className="w-full h-full object-cover" src={ad?.thumbnail || "https://picsum.photos/seed/form1/400/225"} />
            </div>
            <button className="size-20 rounded-lg border-2 border-dashed border-slate-300 hover:border-primary hover:bg-blue-50 transition-all flex flex-col items-center justify-center text-text-muted hover:text-primary">
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>
        <div>
          <label className="form-label">落地页</label>
          <input className="form-input" placeholder="https://" type="url" value={formData.landingPage} onChange={(e) => setFormData({...formData, landingPage: e.target.value})} />
        </div>
        <div>
          <label className="form-label">出价 (CNY)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-sm font-bold">¥</span>
            <input className="form-input pl-8" placeholder="0.00" type="number" value={formData.bid} onChange={(e) => setFormData({...formData, bid: parseFloat(e.target.value) || 0})} />
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-white shrink-0">
        <button onClick={onClose} className="h-11 min-w-[120px] px-6 text-sm font-bold rounded-lg transition-colors bg-[#e7ebf3] hover:bg-[#dbe1ee] text-[#0d121b]">取消</button>
        <button onClick={() => onConfirm(formData)} className="px-8 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20">
          {formMode === 'edit' ? '保存修改' : '立即创建'}
        </button>
      </div>
    </ModalWrapper>
  );
};

/**
 * 统一弹窗入口组件 (保持向后兼容)
 */
const Modal: React.FC<{ type: ModalType; ad: AdItem | null; formMode?: 'create' | 'edit'; onClose: () => void; onConfirm: (data?: any) => void }> = ({ type, ad, formMode, onClose, onConfirm }) => {
  if (!type) return null;
  switch (type) {
    case 'DETAIL': return ad ? <DetailModal ad={ad} onClose={onClose} /> : null;
    case 'DELETE': return ad ? <DeleteModal ad={ad} onClose={onClose} onConfirm={onConfirm} /> : null;
    case 'REJECT_ACTION': return <RejectActionModal onClose={onClose} onConfirm={onConfirm} />;
    case 'APPROVE_ACTION': return <ApproveActionModal onClose={onClose} onConfirm={onConfirm} />;
    case 'REJECT_REASON': return <RejectReasonModal onClose={onClose} onConfirm={onConfirm} />;
    case 'FORM': return <AdFormModal ad={ad} formMode={formMode || 'create'} onClose={onClose} onConfirm={onConfirm} />;
    default: return null;
  }
};

export default Modal;
