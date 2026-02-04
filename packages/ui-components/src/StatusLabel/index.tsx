export enum AdStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  ENDING_SOON = 'ENDING_SOON',
  APPROVED = 'APPROVED'
}

export interface StatusLabelProps {
  status: AdStatus | string;
  variant?: 'default' | 'table';
  className?: string;
}

export const StatusLabel = ({ status, variant = 'default', className = '' }: StatusLabelProps) => {
  const normalizedStatus = status.toUpperCase();

  // 映射状态到样式和文本
  const statusConfig: Record<string, { label: string; colorClass: string; dotClass: string }> = {
    PENDING: {
      label: '待审核',
      colorClass: 'bg-amber-50 text-amber-600 border-amber-200',
      dotClass: 'bg-amber-500',
    },
    APPROVED: {
      label: '已通过',
      colorClass: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      dotClass: 'bg-emerald-500',
    },
    REJECTED: {
      label: '已拒绝',
      colorClass: 'bg-rose-50 text-rose-600 border-rose-200',
      dotClass: 'bg-rose-500',
    },
    ENDING_SOON: {
      label: '即将结束',
      colorClass: 'bg-blue-50 text-blue-600 border-blue-200',
      dotClass: 'bg-blue-500',
    },
  };

  const config = statusConfig[normalizedStatus] || {
    label: status,
    colorClass: 'bg-slate-50 text-slate-600 border-slate-200',
    dotClass: 'bg-slate-400',
  };

  if (variant === 'table') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold border ${config.colorClass} ${className}`}>
        <div className={`size-1 rounded-full ${config.dotClass}`}></div>
        <span>{config.label}</span>
      </div>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${config.colorClass} ${className}`}
    >
      <span className={`size-1.5 rounded-full ${config.dotClass}`}></span>
      {config.label}
    </span>
  );
};

export default StatusLabel;
