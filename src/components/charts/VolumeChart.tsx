import { createChartData } from '@/utils/insight';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import ChartWrapper from './ChartWrapper';

interface Props {
  data?: InsightData[];
}

export default function VolumeChart({ data }: Props) {
  const calculated = data?.map((item: InsightData) => ({
    ...item,
    pvuvratio: (item.pv / item.uv).toFixed(3),
  }));
  const chartData = createChartData(calculated, ['volume']);

  return (
    <ChartWrapper title={'일자 별 발행량'}>
      {chartData && (
        <ResponsiveContainer>
          <BarChart width={420} height={250} data={chartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='volume' fill='rgb(50, 39, 149)' />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartWrapper>
  );
}
