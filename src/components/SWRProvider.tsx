'use client';

import React from 'react';
import { SWRConfig } from 'swr';

export default function SWRProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: any;
}) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          if (error.status === 404) return;
          if (retryCount >= 10) return;
        },
        ...value,
      }}
    >
      {children}
    </SWRConfig>
  );
}
