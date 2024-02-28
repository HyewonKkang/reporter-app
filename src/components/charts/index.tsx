import React from 'react';
import { preprocessInsightData } from '@/utils/insight';
import PVUVComparisonChart from './PVUVComparisonChart';
import useInsightData from '@/hooks/useInsightData';
import DailyUVtoPVChart from './DailyUVtoPVChart';
import VolumeChart from './VolumeChart';
import styles from './Charts.module.css';
import Result from '../result';

interface Props {
  reporterId: string;
  selectedDates?: IDateRangePicker;
}

export default function Charts({ reporterId, selectedDates }: Props) {
  const insightData = useInsightData(reporterId, selectedDates);

  if (insightData?.error)
    return (
      <Result
        status='error'
        title='에러가 발생했습니다. 잠시 후 시도해주세요.'
        style={{ margin: '1rem 0' }}
      />
    );

  const mergedData = preprocessInsightData(insightData?.data) as InsightData[];

  return (
    <div className={styles.dashboard}>
      <PVUVComparisonChart data={mergedData} />
      <div className={styles.dashboard_grid}>
        <DailyUVtoPVChart data={mergedData} />
        <VolumeChart data={mergedData} />
      </div>
    </div>
  );
}
