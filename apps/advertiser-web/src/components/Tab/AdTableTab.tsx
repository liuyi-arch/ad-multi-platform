
import React from 'react';
import { AdStatus } from '../../types';

interface AdTableTabProps {
  activeTab: 'ALL' | AdStatus;
  onTabChange: (tab: 'ALL' | AdStatus) => void;
}

const AdTableTab: React.FC<AdTableTabProps> = ({ activeTab, onTabChange }) => (
  <div className="px-6 py-5 border-b border-slate-50">
    <div className="flex items-center gap-2 p-1 bg-[#f8fafc] w-fit rounded-xl">
      <button 
        onClick={() => onTabChange('ALL')}
        className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'ALL' ? 'bg-[#2563eb] text-white shadow-md shadow-blue-500/20' : 'text-slate-500 hover:text-slate-700'}`}
      >
        全部广告
      </button>
      <button 
        onClick={() => onTabChange(AdStatus.APPROVED)}
        className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === AdStatus.APPROVED ? 'bg-[#2563eb] text-white shadow-md shadow-blue-500/20' : 'text-slate-500 hover:text-slate-700'}`}
      >
        已通过
      </button>
      <button 
        onClick={() => onTabChange(AdStatus.PENDING)}
        className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === AdStatus.PENDING ? 'bg-[#2563eb] text-white shadow-md shadow-blue-500/20' : 'text-slate-500 hover:text-slate-700'}`}
      >
        待审核
      </button>
      <button 
        onClick={() => onTabChange(AdStatus.REJECTED)}
        className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === AdStatus.REJECTED ? 'bg-[#2563eb] text-white shadow-md shadow-blue-500/20' : 'text-slate-500 hover:text-slate-700'}`}
      >
        已拒绝
      </button>
    </div>
  </div>
);

export default AdTableTab;
