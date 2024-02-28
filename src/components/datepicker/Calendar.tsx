import { HTMLAttributes } from 'react';
import { format, addDays } from 'date-fns';
import styles from './Datepicker.module.css';
import { getClassNameForDay, DAYS_PER_WEEK, isSelectableDate } from '@/utils/date';

interface Props extends HTMLAttributes<HTMLTableSectionElement> {
  currentDate: Date;
  onDateClick: (day: Date) => void;
  startDate: Date;
  monthStart: Date;
  todayDate: Date;
  totalDays: number;
  dateRange?: IDateRangePicker;
  dateLabel?: DateLabel;
}

function Calendar({
  currentDate,
  onDateClick,
  startDate,
  monthStart,
  todayDate,
  totalDays,
  dateRange,
  dateLabel,
  ...rest
}: Props) {
  const createDay = (day: Date, className: any) => {
    return (
      <td
        key={format(day, 'd')}
        className={className}
        onClick={() => {
          if (isSelectableDate({ day, dateRange, dateLabel, todayDate })) onDateClick(day);
        }}
      >
        <div>{format(day, 'd')}</div>
      </td>
    );
  };

  const createRows = () => {
    const daysArray = Array.from({ length: totalDays }, (_, i) => addDays(startDate, i));

    const rows = Array.from({ length: Math.ceil(totalDays / DAYS_PER_WEEK) }, (_, i) =>
      daysArray.slice(i * DAYS_PER_WEEK, (i + 1) * DAYS_PER_WEEK),
    );

    return rows.map((daysRow, i) => (
      <tr className={styles.row} key={i}>
        {daysRow.map((day) => {
          const className = getClassNameForDay({
            day,
            currentDate,
            monthStart,
            todayDate,
            dateRange,
            dateLabel,
            styleClasses: styles,
          });
          return createDay(day, className);
        })}
      </tr>
    ));
  };

  return (
    <tbody className={styles.table_body} {...rest}>
      {createRows()}
    </tbody>
  );
}

export default Calendar;
