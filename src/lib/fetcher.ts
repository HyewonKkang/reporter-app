import { api } from './api';
import { FetchError } from './error';
import { unstable_serialize } from 'swr';
import config from '@/configs/env';
import { unstable_serialize as infinite_unstable_serialize } from 'swr/infinite';
import { filterContentList } from '@/utils/common';

export const createParams = (params: Record<string, any>, separator = '&') => {
  return Object.keys(params)
    .map((k: string) => `${k}=${params[k]}`)
    .join(separator);
};

export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const error = new FetchError('Failed to fetch data', res.status);
    throw error;
  }

  return res.json();
}

const apiUrl = config.NEXT_PUBLIC_API_SERVER_URL;

export async function fetchDataWithCachePrep<T = any>(
  paths?: RequestInfo | RequestInfo[],
  options?: RequestInit,
) {
  if (!paths) return;
  try {
    if (Array.isArray(paths)) {
      const serverReqPaths = paths.map((path) => `${apiUrl}${path}`);
      const data = await api.getAll<T>(serverReqPaths, options);
      return {
        data,
        fallback: { [unstable_serialize(paths.map((path) => `/api${path}`))]: data },
      };
    } else {
      const data = await api.get<T>(`${apiUrl}${paths}`, options);
      return {
        data,
        fallback: { [`/api${paths}`]: data },
      };
    }
  } catch (error) {
    throw error;
  }
}

export async function fetchInfiniteDataWithCachePrep<T = Content | Guestbook>(
  paths: RequestInfo[],
  getKey: (pageIndex: number, previousPageData?: PageContent<T>) => string | null,
  options?: RequestInit,
) {
  try {
    const serverReqPaths = paths.map((path) => `${apiUrl}${path}`);
    let data = await api.getAll<PageContent<T>>(serverReqPaths, options);

    if (paths[0].toString().includes('content')) {
      data = filterContentList(data as PageContent<Content>[]) as PageContent<T>[];
    }

    return {
      data,
      fallback: {
        [infinite_unstable_serialize(getKey)]: data,
        [getKey(0) as string]: data[0],
        [getKey(1) as string]: data[1],
      },
    };
  } catch (error) {
    throw error;
  }
}
