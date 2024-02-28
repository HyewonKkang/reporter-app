import { api } from '@/lib/api';
import { DATE_FORMAT } from '@/utils/date';
import { insightTypes } from '@/utils/insight';
import { format } from 'date-fns';
import useSWRImmutable from 'swr/immutable';

export default function useInsightData(reporterId: string, range?: IDateRangePicker) {
  if (!range || !range.startDate || !range.endDate) return;
  const { startDate: _startDate, endDate: _endDate } = range;
  const startDate = format(_startDate, DATE_FORMAT);
  const endDate = format(_endDate, DATE_FORMAT);
  const requests = insightTypes.map(
    (type) => `/api/insight/${type}/${reporterId}?startDate=${startDate}&endDate=${endDate}`,
  );
  const { data, ...result } = useSWRImmutable(requests, api.getAll);

  return {
    data: insightTypes.reduce((acc, cur, idx) => ({ ...acc, [cur]: data?.[idx] }), {}),
    ...result,
  };
}
