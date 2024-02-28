import { zip, merge } from 'lodash-es';

export const insightTypes = ['pv', 'uv', 'volume'];

export const preprocessInsightData = (data: any) => {
  if (!data) return null;
  const { pv, uv, volume } = data;
  const zipped = zip(pv, uv, volume);
  return zipped.map((data) => merge({}, ...data)).reverse();
};

export const createChartData = (data: InsightData[] | undefined, keys: string[]) => {
  if (!data) return;
  return data.map((item: any) => ({
    date: item.date,
    ...keys.reduce((acc: any, key: string) => ({ ...acc, [key]: item[key] }), {}),
  }));
};
