import { fetchDataWithCachePrep } from '@/lib/fetcher';
import config from '@/configs/env';
import { api } from '@/lib/api';

const apiUrl = config.NEXT_PUBLIC_API_SERVER_URL;

const getContentData = async (reporterId: string, contentId: string) => {
  return await fetchDataWithCachePrep(`/content/${reporterId}/${contentId}`, {
    cache: 'no-store',
  });
};

const getReporterData = async (reporterId: string) => {
  return await fetchDataWithCachePrep(`/reporter/${reporterId}`);
};

const updatePV = async (reporterId: string, contentId: string) => {
  return api.put<Content>(`${apiUrl}/content/${reporterId}/${contentId}/pv`);
};

export const getContents = async (reporterId: string, contentId: string) => {
  const [contentData, reporterData] = await Promise.all([
    getContentData(reporterId, contentId),
    getReporterData(reporterId),
  ]);

  updatePV(reporterId, contentId);

  return {
    contentData,
    reporterData,
  };
};

export const getAllContentsPreview = async () => {
  return await fetchDataWithCachePrep([`/content?page=0&size=10`], {
    cache: 'no-store',
  });
};
