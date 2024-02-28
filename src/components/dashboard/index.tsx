'use client';

import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import { DatePicker, DateRangePicker } from '@/components/datepicker';
import TopArticlesList from '@/components/topArticlesList';
import { defaultDate, defaultRangeDates } from '@/utils/date';
import dynamic from 'next/dynamic';
import { Skeleton } from '../skeleton';

interface Props {
  reporterId: string;
}

const Charts = dynamic(() => import('@/components/charts'), {
  ssr: false,
  loading: () => <Skeleton type='paragraph' height={'800px'} style={{ margin: '3rem 0' }} />,
});

export default function Dashboard({ reporterId }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>(defaultDate);
  const [selectedDateRange, setSelectedDateRange] = useState<IDateRangePicker>(defaultRangeDates);

  const onChangeDates = (changed: Date | IDateRangePicker) => {
    if (changed instanceof Date) {
      setSelectedDate(changed);
    } else {
      setSelectedDateRange((prev) => ({ ...prev, ...changed }));
    }
  };

  return (
    <>
      <section className={styles.section}>
        <h1 className={styles.section_title}>Top Contents</h1>
        <DatePicker onChangeDates={onChangeDates} style={{ width: '200px' }} />
        <TopArticlesList selectedDate={selectedDate} reporterId={reporterId} />
      </section>
      <section className={styles.section}>
        <h1 className={styles.section_title}>Insight Summary</h1>
        <DateRangePicker onChangeDates={onChangeDates} selectedDateRange={selectedDateRange} />
        <Charts selectedDates={selectedDateRange} reporterId={reporterId} />
      </section>
    </>
  );
}
