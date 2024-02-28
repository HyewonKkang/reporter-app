import React from 'react';
import Result from '../result';
import Link from 'next/link';
import Button from '../button';

interface Props {
  reporterId: string;
}

export default function DeletedArticle({ reporterId }: Props) {
  return (
    <Result title={'존재하지 않는 기사입니다.'} status={'warning'} style={{ margin: '2rem' }}>
      <Link href={`/reporter/${reporterId}`}>
        <Button size={'large'}>기자 페이지로 이동하기</Button>
      </Link>
    </Result>
  );
}
