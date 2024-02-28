import { useState, useEffect, HTMLAttributes } from 'react';
import styles from './Datepicker.module.css';
import DatePickerPanel from './DatePickerPanel';
import useModal from '@/hooks/useModal';
import Input from '../input';
import { IoIosCalendar } from 'react-icons/io';
import { format, subDays } from 'date-fns';
import { DATE_FORMAT } from '@/utils/date';

interface Props extends HTMLAttributes<HTMLDivElement> {
  onChangeDates: (date: IDateRangePicker | Date) => void;
  hasRange?: boolean;
  dateLabel?: DateLabel;
  dateRange?: IDateRangePicker;
}

function DatePicker({ onChangeDates, hasRange = false, dateLabel, dateRange, ...rest }: Props) {
  const defaultDate = hasRange && dateLabel === 'startDate' ? subDays(new Date(), 7) : new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(defaultDate);

  const { ref, isOpen, setIsOpen, handleClickInside } = useModal({ initialMode: false });

  const onDateClick = (day: Date) => {
    onChangeDates(hasRange ? { [dateLabel as string]: day } : day);
    setSelectedDate(day);
  };

  useEffect(() => {
    setTimeout(() => setIsOpen(false), 200);
  }, [selectedDate]);

  return (
    <div ref={ref} className={styles.date_picker_wrapper} {...rest}>
      <Input
        type='date'
        readOnly
        value={format(selectedDate, DATE_FORMAT)}
        rightAddon={<IoIosCalendar color='grey' size={20} />}
        onClick={handleClickInside}
        aria-label={dateLabel ? `${dateLabel} date picker` : 'date picker'}
      />
      <div>
        {isOpen && (
          <DatePickerPanel
            selectedDate={selectedDate}
            onDateClick={onDateClick}
            onClick={handleClickInside}
            dateRange={dateRange}
            dateLabel={dateLabel}
          />
        )}
      </div>
    </div>
  );
}

export default DatePicker;
