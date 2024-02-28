import { fetchInfiniteDataWithCachePrep } from '@/lib/fetcher';
import { getKeys } from '@/utils/swrInfinite';

export const getReporterGuestbook = async (reporterId: string) => {
  return await fetchInfiniteDataWithCachePrep<Guestbook>(
    [`/guestbook/${reporterId}?page=0`, `/guestbook/${reporterId}?page=1`],
    getKeys('guestbook', reporterId),
    { cache: 'no-store' },
  );
};
