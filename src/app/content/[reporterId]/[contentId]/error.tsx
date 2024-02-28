'use client';

import { ErrorComponent } from '@/components/error';
import { FetchError } from '@/lib/error';

export default function Error({
  error,
  reset,
}: {
  error: FetchError & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorComponent
      title={'요청하신 기사가 존재하지 않습니다.'}
      subtitle={'요청한 기사가 올바른지 다시 한번 확인 해 주세요.'}
      error={error}
      reset={reset}
    />
  );
}
