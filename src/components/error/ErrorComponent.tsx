import React from 'react';
import Result from '../result';
import Link from 'next/dist/client/link';
import Button from '../button';
import { FetchError } from '@/lib/error';

export default function ErrorComponent({
  title = '에러가 발생했습니다.',
  subtitle = '다시 시도해주세요.',
  error,
  reset,
}: {
  title?: string;
  subtitle?: string;
  error: FetchError & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <div className={'error_boundary_container'}>
        <Result
          title={title}
          subTitle={subtitle}
          status={'error'}
          style={{ height: '800px' }}
          hasBorder={false}
        >
          <Link href='/'>
            <Button size={'large'}>Back Home</Button>
          </Link>
          <Button size={'large'} onClick={reset} style={{ marginLeft: '10px' }}>
            Try again
          </Button>
        </Result>
      </div>
    </main>
  );
}
