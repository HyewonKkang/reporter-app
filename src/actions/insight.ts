import { fetchDataWithCachePrep } from '@/lib/fetcher';
import { formattedStartDate, formattedEndDate } from '@/utils/date';
import { insightTypes } from '@/utils/insight';

export const getInsightData = async (reporterId: string) => {
  const insightRequestUrls = insightTypes.map(
    (type) =>
      `/insight/${type}/${reporterId}?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
  );
  const topRequestUrl = `/insight/top/${reporterId}?startDate=${formattedEndDate}&endDate=${formattedEndDate}`;

  const [insightData, topData] = await Promise.all([
    fetchDataWithCachePrep(insightRequestUrls),
    fetchDataWithCachePrep(topRequestUrl),
  ]);

  const topContents = await fetchDataWithCachePrep(
    topData?.data[0].topContent.map(
      (content: TopContentData) => `/content/${reporterId}/${content.contentId}`,
    ),
  );
  return [insightData, topData, topContents];
};
