import { fetchDataWithCachePrep, fetchInfiniteDataWithCachePrep } from '@/lib/fetcher';
import { isCurrentUserReporter } from './auth';
import { getKeys } from '@/utils/swrInfinite';

export const getReporterUseInsight = async (reporterId: string): Promise<boolean> => {
  const [reporterData, isOwner] = await Promise.all([
    getReporterProfile(reporterId),
    isCurrentUserReporter(reporterId),
  ]);
  return reporterData?.data.useInsight || isOwner;
};

export const getReporterUseComment = async (reporterId: string): Promise<boolean> => {
  const [reporterData, isOwner] = await Promise.all([
    getReporterProfile(reporterId),
    isCurrentUserReporter(reporterId),
  ]);
  return reporterData?.data.useComment || isOwner;
};

const getReporterGuestbook = async (reporterId: string) => {
  return await fetchDataWithCachePrep(`/guestbook/${reporterId}?page=0&size=4`);
};

const getReporterProfile = async (reporterId: string) => {
  return await fetchDataWithCachePrep(`/reporter/${reporterId}`);
};

export const getContentList = async (reporterId?: string, searchKeyword?: string) => {
  return await fetchInfiniteDataWithCachePrep<Content>(
    [
      `/content${reporterId ? `/${reporterId}` : ''}${searchKeyword ? `/keyword?keyword=${searchKeyword}&` : '?'}page=0`,
      `/content${reporterId ? `/${reporterId}` : ''}${searchKeyword ? `/keyword?keyword=${searchKeyword}&` : '?'}page=1`,
    ],
    getKeys('content', reporterId, searchKeyword),
  );
};

export const getReporter = async (reporterId: string, searchKeyword?: string) => {
  const [guestbook, profile, contentList] = await Promise.all([
    getReporterGuestbook(reporterId),
    getReporterProfile(reporterId),
    getContentList(reporterId, searchKeyword),
  ]);

  return {
    guestbook,
    profile,
    contentList,
  };
};

export const getAllReporters = async () => {
  return await fetchInfiniteDataWithCachePrep<Reporter>(
    ['/reporter?page=0', '/reporter?page=1'],
    getKeys('reporter'),
  );
};
