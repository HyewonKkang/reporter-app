import { isSameDay, isSameMonth, subDays, format } from 'date-fns';

export const days = ['일', '월', '화', '수', '목', '금', '토'];

export const DAYS_PER_WEEK = 7;

export const DATE_FORMAT = 'yyyy-MM-dd';

export const DATETIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';

export function isSelectableDate({
  day,
  dateRange,
  dateLabel,
  todayDate,
}: {
  day: Date;
  todayDate: Date;
  dateRange?: IDateRangePicker;
  dateLabel?: DateLabel;
}) {
  if (!dateRange) {
    return day <= todayDate;
  }
  if (dateLabel === 'startDate' && dateRange?.endDate) {
    return day <= dateRange?.endDate;
  }
  if (dateLabel === 'endDate' && dateRange?.startDate) {
    return day >= dateRange.startDate && day <= todayDate;
  }
  return true;
}

export function getClassNameForDay({
  day,
  currentDate,
  monthStart,
  todayDate,
  styleClasses,
  dateRange,
  dateLabel,
}: {
  day: Date;
  currentDate: Date;
  monthStart: Date;
  todayDate: Date;
  styleClasses: any;
  dateRange?: IDateRangePicker;
  dateLabel?: DateLabel;
}) {
  let className = styleClasses.col;
  if (
    !isSameMonth(day, monthStart) ||
    !isSelectableDate({ day, dateRange, dateLabel, todayDate })
  ) {
    className += ` ${styleClasses.disabled}`;
  } else if (isSameDay(day, currentDate)) {
    className += ` ${styleClasses.selected}`;
  }

  if (isSameDay(day, todayDate)) {
    className += ` ${styleClasses.today}`;
  }

  return className;
}
export const defaultRangeDates = {
  startDate: subDays(new Date(), 7),
  endDate: new Date(),
};

export const defaultDate = new Date();

export const formattedStartDate = format(defaultRangeDates.startDate, DATE_FORMAT);
export const formattedEndDate = format(defaultRangeDates.endDate, DATE_FORMAT);

export const elapsedTime = (date: string): string => {
  const start = new Date(date);
  const end = new Date();

  const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
  if (seconds < 60) return '방금 전';

  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;

  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;

  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;

  return format(new Date(date), 'yyyy/MM/dd');
};
