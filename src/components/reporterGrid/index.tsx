'use client';

import useSWRInfiniteScroll from '@/hooks/useSWRInfiniteScroll';
import React, { HTMLAttributes } from 'react';
import styles from './ReporterGrid.module.css';
import GridItem from './GridItem';
import Result from '../result';
import LoadMoreButton from '../list/LoadMoreButton';

interface Props extends HTMLAttributes<HTMLDivElement> {
  initialData?: PageContent<Reporter>[];
}

export default function ReporterGrid({ initialData }: Props) {
  const { data, loadMore, error } = useSWRInfiniteScroll<Reporter>({
    type: 'reporter',
    initialData,
  });

  if (error) {
    return (
      <Result status='error' title='에러가 발생했습니다. 잠시 후 시도해주세요.' hasBorder={false} />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid_wrapper}>
        {!data || (data?.[0].first && data?.[0].empty) ? (
          <Result title={'표시될 컨텐츠가 없습니다.'} />
        ) : (
          data?.map(
            (pageData: PageContent<Reporter>) =>
              pageData?.content?.map((info: Reporter) => <GridItem key={info.id} data={info} />),
          )
        )}
      </div>
      {data?.[data.length - 1]?.last === false ? (
        <LoadMoreButton onClick={loadMore} />
      ) : (
        <div style={{ height: '46px', margin: '1rem 0' }}></div>
      )}
    </div>
  );
}
