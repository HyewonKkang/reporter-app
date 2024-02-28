import { sessionStorageHandler } from '@/lib/storageHandler';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { FixedSizeListProps, ListOnItemsRenderedProps, FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

interface Props {
  width: any;
  height: any;
  loadMoreItems: () => void;
  isItemLoaded: (index: number) => boolean;
  listData: Content[];
  totalElements: number;
  reporterId?: string;
  row: FixedSizeListProps['children'];
  listClassName?: any;
}

export default function InfiniteList({
  width,
  height,
  loadMoreItems,
  isItemLoaded,
  totalElements,
  listData,
  reporterId,
  listClassName,
  row,
}: Props) {
  const session = sessionStorageHandler;
  const listRef = useRef<FixedSizeList | null>(null);
  const startIndexRef = useRef<number>(Number(session.get('scrollIndex') ?? 0));
  const pageIndexRef = useRef<string>(session.get('pageNumber') ?? '');
  const isFirstRenderRef = useRef<boolean>(true);

  const resetStorage = () => {
    session.remove('scrollIndex');
    session.set('pageNumber', reporterId ?? '');
  };

  const scrollHandler = async () => {
    listRef?.current?.scrollToItem(startIndexRef.current ?? 0, 'start');
  };

  const customHandleScroll = ({
    visibleStartIndex,
  }: Pick<ListOnItemsRenderedProps, 'visibleStartIndex'>) => {
    if (!isFirstRenderRef.current) {
      startIndexRef.current = visibleStartIndex;
    }
  };

  useEffect(() => {
    return () => {
      session.set('scrollIndex', startIndexRef.current.toString());
    };
  }, [startIndexRef]);

  useEffect(() => {
    if (reporterId) session.set('pageNumber', reporterId);
    isFirstRenderRef.current = false;

    const unloadHandler = () => {
      console.log('beforeunload:', window.history.state);
      resetStorage();
    }; // only for reload

    window.addEventListener('beforeunload', unloadHandler);
    return () => {
      window.removeEventListener('beforeunload', unloadHandler);
    };
  }, []);

  useLayoutEffect(() => {
    if (pageIndexRef.current !== reporterId) {
      resetStorage();
      return;
    }
    scrollHandler();
  }, []);

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={totalElements}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          width={width}
          height={height}
          itemCount={listData.length}
          itemSize={162}
          className={listClassName}
          itemKey={(index) => listData[index].id ?? index}
          itemData={listData}
          overscanCount={isFirstRenderRef?.current ? 40 : 10}
          ref={(list) => {
            ref(list);
            listRef.current = list;
          }}
          onItemsRendered={({
            overscanStartIndex,
            overscanStopIndex,
            visibleStartIndex,
            visibleStopIndex,
          }) => {
            onItemsRendered({
              overscanStartIndex,
              overscanStopIndex,
              visibleStartIndex,
              visibleStopIndex,
            });
            customHandleScroll({ visibleStartIndex });
          }}
        >
          {row}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );
}
