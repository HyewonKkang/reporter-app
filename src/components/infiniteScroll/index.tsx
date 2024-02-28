import React, { HTMLAttributes } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeListProps } from 'react-window';
import InfiniteList from './InfiniteList';

interface Props extends HTMLAttributes<HTMLDivElement> {
  reporterId?: string;
  initialData?: PageContent<any>[];
  keyword?: string;
  row: FixedSizeListProps['children'];
  listClassName?: any;
  contentType?: 'content' | 'guestbook';
  isItemLoaded: (index: number) => boolean;
  loadMoreItems: () => void;
  listData: Content[];
  totalElements: number;
}

export default function InfiniteScroll({
  reporterId,
  listClassName,
  isItemLoaded,
  loadMoreItems,
  listData,
  totalElements,
  row,
}: Props) {
  return (
    <AutoSizer defaultHeight={700} defaultWidth={1000}>
      {({ width, height }) => (
        <InfiniteList
          width={width}
          height={height}
          isItemLoaded={isItemLoaded}
          loadMoreItems={loadMoreItems}
          listData={listData}
          totalElements={totalElements}
          reporterId={reporterId}
          row={row}
          listClassName={listClassName}
        />
      )}
    </AutoSizer>
  );
}
