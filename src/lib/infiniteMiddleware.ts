'use client';

import { SWRHook, useSWRConfig } from 'swr';

export const infiniteMiddleware = (useSWRNext: SWRHook) => {
  const { fallback, cache } = useSWRConfig();

  return (key: any, fetcher: any, config: any): any => {
    const extendedFetcher = (...args: any[]) => {
      const path = args[0];
      if (!cache.get(path) && fallback[path]) {
        return fallback[path];
      } else {
        return fetcher(...args);
      }
    };

    const swr = useSWRNext(key, extendedFetcher, config);

    return swr;
  };
};
