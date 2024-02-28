import { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { FetchError } from '@/lib/error';
import { api } from '@/lib/api';
import { flattenContent } from '@/utils/common';
import { getKeys, infiniteConfigs } from '@/utils/swrInfinite';

type ContentType = 'content' | 'guestbook';

interface Props<T> {
  reporterId?: string | number;
  type?: ContentType;
  initialData?: any;
  keyword?: string;
}

export default function useInfiniteScroll<T = any>({
  reporterId,
  initialData,
  type = 'content',
  keyword,
}: Props<T>) {
  const getKey = getKeys(type, reporterId, keyword);

  const { data, size, setSize, isLoading, mutate, isValidating, ...rest } = useSWRInfinite<
    PageContent<T>,
    FetchError
  >(getKey, (path: string) => api.get(path), infiniteConfigs);

  const [flattenedData, setFlattenedData] = useState<Content[]>(
    flattenContent(data || initialData),
  );

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

  const isItemLoaded = (index: number): boolean => {
    return flattenedData[index] !== undefined;
  };

  const loadMoreItems = () => {
    if (!isLoading && !isValidating) setSize(size + 1);
  };

  useEffect(() => {
    setFlattenedData(flattenContent(data));
  }, [data]);

  return {
    setSize,
    data: flattenedData,
    totalElements: data?.[0].totalElements ?? 0,
    size,
    isLoading,
    isValidating,
    isItemLoaded,
    loadMoreItems,
    revalidatePage,
    ...rest,
  };
}
