import React from 'react';
import styles from './Datepicker.module.css';
import { DatePicker } from '.';

interface Props {
  onChangeDates: (date: IDateRangePicker | Date) => void;
  selectedDateRange: IDateRangePicker;
}

export default function DateRangePicker({ onChangeDates, selectedDateRange, ...rest }: Props) {
  return (
    <>
      <div className={styles.date_picker_wrapper} {...rest}>
        <div className={styles.date_range_picker_wrapper}>
          <DatePicker
            onChangeDates={onChangeDates}
            hasRange
            dateLabel='startDate'
            dateRange={selectedDateRange}
          />
          <p>-</p>
          <DatePicker
            onChangeDates={onChangeDates}
            hasRange
            dateLabel='endDate'
            dateRange={selectedDateRange}
          />
        </div>
      </div>
    </>
  );
}
