import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import useSWRInfinite from 'swr/infinite';
import { FetchError } from '@/lib/error';
import { api } from '@/lib/api';
import { ContentType, getKeys, infiniteConfigs } from '@/utils/swrInfinite';

interface Props<T> {
  reporterId?: string | number;
  type?: ContentType;
  initialData?: any;
  keyword?: string;
}

export default function useSWRInfiniteScroll<T = any>({
  reporterId,
  initialData,
  type = 'content',
  keyword,
}: Props<T>) {
  const [ref, inView] = useInView();

  const getKey = getKeys(type, reporterId, keyword);

  const { data, size, setSize, isLoading, mutate, isValidating, ...rest } = useSWRInfinite<
    PageContent<T>,
    FetchError
  >(getKey, api.get, { fallbackData: initialData, ...infiniteConfigs });

  const revalidatePage = async (pageIndex?: number) => {
    if (pageIndex == null) return;
    const key = getKey(pageIndex);
    if (!key) return;

    try {
      const newDataArray = [...(data as PageContent<T>[])];
      const changedPageData: PageContent<T> = await api.get(key);
      newDataArray[pageIndex] = changedPageData;

      mutate(newDataArray, false);
    } catch (error) {
      throw error;
    }
  };

  const loadMore = () => {
    setSize((size) => size + 1);
  };

  const isLastPage = (data: PageContent<T>[]) => {
    const lastData = data[data.length - 1];
    return lastData && lastData.last && lastData.empty;
  };

  useEffect(() => {
    if (!inView || !data || isValidating || isLastPage(data)) return;
    setSize((size) => size + 1);
  }, [inView, isValidating, data]);

  return {
    revalidatePage,
    setSize,
    data: data?.slice(0, size - 1),
    ref,
    loadMore,
    totalElements: data?.[0]?.totalElements ?? 0,
    isLoading: isLoading || isValidating,
    ...rest,
  };
}
