import { infiniteMiddleware } from '@/lib/infiniteMiddleware';
import { SWRInfiniteConfiguration } from 'swr/infinite';

export type ContentType = 'content' | 'guestbook' | 'reporter';

export const getKeys =
  <T>(type: ContentType, reporterId?: string | number, keyword?: string) =>
  (pageIndex: number, previousPageData?: PageContent<T>) => {
    if (pageIndex > 0 && previousPageData?.last) return null;

    return `/api/${type}${reporterId ? `/${reporterId}` : ''}${
      keyword ? `/keyword?keyword=${keyword}&` : '?'
    }page=${pageIndex}`;
  };

export const infiniteConfigs: SWRInfiniteConfiguration = {
  revalidateFirstPage: false,
  parallel: true,
  initialSize: 2,
  revalidateOnMount: false,
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  use: [infiniteMiddleware],
};
