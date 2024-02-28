import { HTMLAttributes } from 'react';
import styles from './Datepicker.module.css';
import { format } from 'date-fns';
import Calendar from './Calendar';
import Button from '../button';
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import { days } from '@/utils/date';
import useDate from '@/hooks/useDate';

interface Props extends HTMLAttributes<HTMLDivElement> {
  selectedDate: Date;
  onDateClick: (day: Date) => void;
  dateRange?: IDateRangePicker;
  dateLabel?: DateLabel;
}

function DatePickerPanel({ selectedDate, onDateClick, dateRange, dateLabel, ...rest }: Props) {
  const { getPrevYear, getNextYear, getPrevMonth, getNextMonth, currentDate, ...calendarProps } =
    useDate(selectedDate);

  const arrowIconProps = {
    color: 'black',
    style: { margin: '3px' },
    size: 20,
  };

  return (
    <div className={styles.picker_panel} {...rest}>
      <div className={styles.picker_header}>
        <MdKeyboardDoubleArrowLeft onClick={getPrevYear} {...arrowIconProps} />
        <MdKeyboardArrowLeft onClick={getPrevMonth} {...arrowIconProps} />
        <div className={styles.picker_header_view}>
          {format(currentDate, 'LLL')} {format(currentDate, 'y')}
        </div>
        <MdKeyboardArrowRight onClick={getNextMonth} {...arrowIconProps} />
        <MdKeyboardDoubleArrowRight onClick={getNextYear} {...arrowIconProps} />
      </div>
      <div className={styles.picker_body}>
        <table className={styles.picker_content}>
          <thead>
            <tr>
              {days.map((dayName: string) => (
                <th key={dayName}>{dayName}</th>
              ))}
            </tr>
          </thead>
          <Calendar
            currentDate={currentDate}
            onDateClick={onDateClick}
            dateRange={dateRange}
            dateLabel={dateLabel}
            {...calendarProps}
          />
        </table>
      </div>
      <div className={styles.picker_footer}>
        <Button
          variant='text'
          size='small'
          underline={false}
          style={{ fontSize: '14px' }}
          onClick={() => onDateClick(new Date())}
        >
          Today
        </Button>
      </div>
    </div>
  );
}

export default DatePickerPanel;
