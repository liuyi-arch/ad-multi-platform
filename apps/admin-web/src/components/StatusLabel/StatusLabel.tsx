
import React from 'react';
import { AdStatus } from '../../types/index';

interface StatusLabelProps {
  status: AdStatus;
}

const StatusLabel: React.FC<StatusLabelProps> = ({ status }) => {
  switch (status) {
    case AdStatus.PENDING:
      return (
        <span className="status-badge bg-amber-50 text-amber-600 border border-amber-200">
          <span className="size-1.5 rounded-full bg-amber-500"></span>
          待审核
        </span>
      );
    case AdStatus.ACTIVE:
      return (
        <span className="status-badge bg-emerald-50 text-emerald-600 border border-emerald-200">
          <span className="size-1.5 rounded-full bg-emerald-500"></span>
          已通过
        </span>
      );
    case AdStatus.REJECTED:
      return (
        <span className="status-badge bg-rose-50 text-rose-600 border border-rose-200">
          <span className="size-1.5 rounded-full bg-rose-500"></span>
          已拒绝
        </span>
      );
    default:
      return (
        <span className="status-badge bg-slate-50 text-slate-600 border border-slate-200">
          <span className="size-1.5 rounded-full bg-slate-400"></span>
          未知
        </span>
      );
  }
};

export default StatusLabel;
