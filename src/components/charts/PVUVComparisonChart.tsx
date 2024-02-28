import { createChartData } from '@/utils/insight';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import ChartWrapper from './ChartWrapper';

interface Props {
  data?: InsightData[];
}

export default function PVUVComparisonChart({ data }: Props) {
  const pvUvChartData = createChartData(data, ['pv', 'uv']);

  return (
    <ChartWrapper title={'Page Views and Unique Visitors'}>
      {data && (
        <ResponsiveContainer>
          <LineChart width={900} height={250} data={pvUvChartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='pv' stroke='rgb(85, 150, 243)' />
            <Line type='monotone' dataKey='uv' stroke='#82ca9d' />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartWrapper>
  );
}
