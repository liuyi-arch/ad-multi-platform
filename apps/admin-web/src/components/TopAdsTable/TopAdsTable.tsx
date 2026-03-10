
import { FC } from 'react';
import { AdItem } from '../../types/index';
import { StatusLabel } from '@repo/ui-components';

interface TopAdsTableProps {
  ads: AdItem[];
}

const TopAdsTable: FC<TopAdsTableProps> = ({ ads }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-800">热门广告排行</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">广告详情</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">热度</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">状态</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ads.map((ad) => (
              <tr key={ad.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {ad.thumbnail && (
                      <img src={ad.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800 truncate text-sm">{ad.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5 capitalize">{ad.category || '未分类'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-bold text-slate-700">
                      {(() => {
                        const h: any = ad.heat;
                        if (h === null || h === undefined) return '0';
                        if (typeof h === 'string') {
                          if ((h as string).toLowerCase().endsWith('k')) return h;
                          const n = parseFloat(h as string);
                          return isNaN(n) ? '0' : n.toLocaleString();
                        }
                        return (h as number).toLocaleString();
                      })()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusLabel status={ad.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopAdsTable;
