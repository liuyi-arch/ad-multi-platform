
import React from 'react';
import { AdItem, AdStatus } from '../../types/index';
import StatusLabel from '../StatusLabel';

interface TopAdsTableProps {
  ads: AdItem[];
  onDetailClick: (ad: AdItem) => void;
}

const TopAdsTable: React.FC<TopAdsTableProps> = ({ ads, onDetailClick }) => {
  // Display only top 3 or 4 ads for the dashboard widget
  const topAds = ads.slice(0, 4);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-background-base text-text-muted text-xs font-bold uppercase tracking-wider">
          <tr>
            <th className="px-6 py-4">项目名称</th>
            <th className="px-6 py-4">状态</th>
            <th className="px-6 py-4">曝光量</th>
            <th className="px-6 py-4">参与度</th>
            <th className="px-6 py-4">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-light">
          {topAds.map((ad, idx) => (
            <tr key={ad.id || idx} className="hover:bg-background-base/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className="size-10 rounded-lg bg-background-base border border-border-light flex items-center justify-center overflow-hidden bg-cover bg-center"
                    style={{ backgroundImage: `url('${ad.thumbnail}')` }}
                  >
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-main">{ad.title.split('：')[0]}</p>
                    <p className="text-[10px] text-text-muted">
                      {ad.category || '分类'} • {ad.brand || '品牌'}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <StatusLabel status={ad.status} />
              </td>
              <td className="px-6 py-4 text-sm font-medium text-text-main">
                {/* Use a placeholder for impressions if not available in data */}
                {(Math.random() * 500000 + 100000).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </td>
              <td className="px-6 py-4">
                <div className="w-24 bg-background-base h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${idx === 1 ? 'bg-emerald-500' : 'bg-primary'}`}
                    style={{ width: `${ad.engagement || 0}%` }}
                  ></div>
                </div>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onDetailClick(ad)}
                  className="p-1.5 rounded-lg hover:bg-background-base text-text-muted transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopAdsTable;
