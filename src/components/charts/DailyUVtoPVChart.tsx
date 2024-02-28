import { createChartData } from '@/utils/insight';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import ChartWrapper from './ChartWrapper';

interface Props {
  data?: InsightData[];
}

export default function DailyUVtoPVChart({ data }: Props) {
  const calculated = data?.map((item: InsightData) => ({
    ...item,
    pvuvratio: (item.pv / item.uv).toFixed(3),
  }));
  const chartData = createChartData(calculated, ['pvuvratio']);

  return (
    <ChartWrapper title={'일자 별 사용자(UV)당 방문 횟수(PV)'}>
      {chartData && (
        <ResponsiveContainer>
          <BarChart width={420} height={250} data={chartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='pvuvratio' fill='rgb(83, 150, 243)' />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartWrapper>
  );
}
