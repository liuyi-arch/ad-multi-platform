
import { useState, useMemo } from 'react';
import { processTrendData } from '../utils/chartHelpers';

/**
 * 封装图表数据展示逻辑
 */
export const useTrendTime = (initialTimeRange: string = '1m') => {
  const [timeRange, setTimeRange] = useState(initialTimeRange);

  const trendResData = useMemo(() => {
    return processTrendData(timeRange);
  }, [timeRange]);

  return {
    timeRange,
    setTimeRange,
    trendResData
  };
};
