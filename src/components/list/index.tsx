'use client';

import { HTMLAttributes, Suspense } from 'react';
import styles from './List.module.css';
import { ListSkeleton } from '../skeleton';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import Result from '../result';
import Button from '../button';
import InfiniteScroll from '../infiniteScroll';
import { FixedSizeListProps } from 'react-window';
import ListItem from './ListItem';

interface Props extends HTMLAttributes<HTMLDivElement> {
  hasReporter?: boolean;
  reporterId?: string;
  initialData?: PageContent<Content>[];
  keyword?: string;
  clearSearch?: () => void;
}

export default function List({
  hasReporter = false,
  initialData,
  reporterId,
  keyword,
  clearSearch,
  ...rest
}: Props) {
  const {
    totalElements,
    data: listData,
    isItemLoaded,
    loadMoreItems,
    error,
  } = useInfiniteScroll({ reporterId, initialData, keyword });

  const Row: FixedSizeListProps['children'] = ({ style, index, data }) => {
    return !isItemLoaded(index) ? (
      <ListSkeleton count={1} />
    ) : (
      <ListItem rowData={data[index]} style={style} />
    );
  };

  if (error) {
    return (
      <Result status='error' title='에러가 발생했습니다. 잠시 후 시도해주세요.' hasBorder={false} />
    );
  }

  return (
    <Suspense fallback={<ListSkeleton count={20} />}>
      {totalElements === 0 ? (
        <Result title={'표시될 컨텐츠가 없습니다.'}>
          <Button onClick={clearSearch}>전체 기사 보기</Button>
        </Result>
      ) : (
        <div
          className={`${styles.list_wrapper} ${reporterId ? styles.reporter_page_list : ''}`}
          {...rest}
        >
          <InfiniteScroll
            reporterId={reporterId}
            initialData={initialData}
            keyword={keyword}
            row={Row}
            listData={listData}
            isItemLoaded={isItemLoaded}
            loadMoreItems={loadMoreItems}
            totalElements={totalElements}
          />
        </div>
      )}
    </Suspense>
  );
}
