import React from 'react';
import Link from 'next/link';
import Button from '@/components/button';
import Result from '@/components/result';

export default function NotFoundComponent({
  title = '존재하지 않는 페이지 입니다.',
  subtitle = '요청하신 페이지가 올바른지 다시 한번 확인 해 주세요.',
}: {
  title?: string;
  subtitle?: string;
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
        </Result>
      </div>
    </main>
  );
}
