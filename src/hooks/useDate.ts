import {
  subYears,
  addYears,
  subMonths,
  addMonths,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  differenceInDays,
} from 'date-fns';
import { useState } from 'react';

export default function useDate(selectedDate: Date) {
  const [currentDate, setCurrentDate] = useState(selectedDate);

  const getPrevYear = () => {
    setCurrentDate(subYears(currentDate, 1));
  };
  const getNextYear = () => {
    setCurrentDate(addYears(currentDate, 1));
  };
  const getPrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  const getNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const todayDate = new Date();
  const totalDays = differenceInDays(endDate, startDate) + 1;

  return {
    getPrevYear,
    getNextYear,
    getPrevMonth,
    getNextMonth,
    currentDate,
    monthStart,
    startDate,
    todayDate,
    totalDays,
  };
}
