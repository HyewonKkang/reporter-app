import { api } from '@/lib/api';
import { FetchError } from '@/lib/error';
import { DATE_FORMAT } from '@/utils/date';
import { format } from 'date-fns';
import useSWRImmutable from 'swr/immutable';

const useTopData = (reporterId: string, date: Date) => {
  const formattedDate = format(date, DATE_FORMAT);
  const params = `?startDate=${formattedDate}&endDate=${formattedDate}`;
  return useSWRImmutable<TopData[], FetchError>(`/api/insight/top/${reporterId}${params}`, api.get);
};

const useContent = (requests: RequestInfo[]) => {
  return useSWRImmutable(requests, api.getAll<any>);
};

export default function useTopContents(reporterId: string, date: Date) {
  const { data, error: topDataError, isLoading: isTopLoading } = useTopData(reporterId, date);
  const topContents = data?.[0]?.topContent;

  const requests = topContents?.map(
    (content: TopContentData) => `/api/content/${reporterId}/${content.contentId}`,
  ) as RequestInfo[];

  const {
    data: contents,
    error: topContentError,
    isLoading: isContentsLoading,
  } = useContent(requests);

  return {
    data: contents?.map((content: Content, idx: number) => ({
      ...content,
      rank: topContents?.[idx].top,
    })),
    error: topDataError || topContentError,
    isLoading: isTopLoading || isContentsLoading,
  };
}
