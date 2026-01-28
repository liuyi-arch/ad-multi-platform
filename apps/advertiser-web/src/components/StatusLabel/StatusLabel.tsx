
import React from 'react';
import { AdStatus } from '../../types';

interface StatusLabelProps {
  status: AdStatus;
}

const StatusLabel: React.FC<StatusLabelProps> = ({ status }) => {
  switch (status) {
    case AdStatus.APPROVED:
      return (
        <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600 border border-green-100">
          <span className="size-2 rounded-full bg-green-500 mr-2"></span>
          已通过
        </span>
      );
    case AdStatus.PENDING:
      return (
        <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600 border border-amber-100">
          <span className="size-2 rounded-full bg-amber-500 mr-2"></span>
          待审核
        </span>
      );
    case AdStatus.REJECTED:
      return (
        <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600 border border-red-100">
          <span className="size-2 rounded-full bg-red-500 mr-2"></span>
          已拒绝
        </span>
      );
    default:
      return null;
  }
};

export default StatusLabel;
