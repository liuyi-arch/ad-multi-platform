
import { CHART_DATA } from '../mockData';

/**
 * 根据时间范围处理趋势图数据
 */
export const processTrendData = (timeframe: string) => {
  if (timeframe === '7d') return CHART_DATA.slice(0, 3);
  if (timeframe === '3m') {
    return [
      ...CHART_DATA.map(d => ({ ...d, name: '9月' + d.name.split('10月')[1] })),
      ...CHART_DATA
    ];
  }
  return CHART_DATA;
};
