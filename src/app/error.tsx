'use client';

import React from 'react';
import { ErrorComponent } from '@/components/error';
import { FetchError } from '@/lib/error';

export default function Error({
  error,
  reset,
}: {
  error: FetchError & { digest?: string };
  reset: () => void;
}) {
  return <ErrorComponent error={error} reset={reset} />;
}
