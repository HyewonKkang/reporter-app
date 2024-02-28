'use client';

import React, { Suspense } from 'react';
import styles from './Guestbook.module.css';
import useSWRInfiniteScroll from '@/hooks/useSWRInfiniteScroll';
import Comment from './Comment';
import GuestbookSkeleton from './GuestbookSkeleton';
import useModal from '@/hooks/useModal';
import { IoIosAddCircleOutline } from 'react-icons/io';
import Button from '../button';
import ListTitle from '../list/ListTitle';
import PostModal from './PostModal';
import Result from '../result';
import useLikeGuestbook from '@/hooks/actions/useLikeGuestbook';

interface Props {
  reporterId: string;
  initialData?: PageContent<Guestbook>[];
}

export default function Guestbook({ reporterId, initialData, ...rest }: Props) {
  const {
    data,
    ref: bottomRef,
    error,
    totalElements,
    isLoading,
  } = useSWRInfiniteScroll({
    reporterId,
    type: 'guestbook',
    initialData,
  });
  const { ref, isOpen, setIsOpen } = useModal({
    initialMode: false,
  });

  const { handleLikeButton } = useLikeGuestbook({ reporterId });

  const rows = (content?: Guestbook[], pageIndex?: number) =>
    content && (
      <div className={styles.guestbook_list}>
        {content.map((comment: Guestbook) => (
          <Comment
            key={comment.id}
            data={comment}
            filled={true}
            pageIndex={pageIndex}
            handleLikeButton={handleLikeButton}
          />
        ))}
      </div>
    );

  if (error) {
    return (
      <Result status='error' title='에러가 발생했습니다. 잠시 후 시도해주세요.' hasBorder={false} />
    );
  }

  return (
    <Suspense fallback={<GuestbookSkeleton count={20} />}>
      <div className={styles.container}>
        <div className={styles.container_inner}>
          <ListTitle>방명록</ListTitle>
          <Button
            variant={'tag'}
            style={{ width: '72px', marginTop: '1rem' }}
            onClick={() => setIsOpen(true)}
          >
            <IoIosAddCircleOutline />
            추가
          </Button>
        </div>
        {totalElements === 0 ? (
          <Result title={'표시될 컨텐츠가 없습니다.'} />
        ) : (
          data?.map(
            (pageData: PageContent<Guestbook>) =>
              pageData && (
                <React.Fragment key={pageData.pageable?.pageNumber}>
                  <div className={styles.list_wrapper}>
                    {rows(pageData.content, pageData.pageable?.pageNumber)}
                  </div>
                  {pageData.last && <div className={styles.end_line}>End of Contents</div>}
                </React.Fragment>
              ),
          )
        )}
        {isLoading && <GuestbookSkeleton count={1} style={{ margin: '1rem 0' }} />}
        <PostModal
          ref={ref}
          open={isOpen}
          reporterId={reporterId}
          closeModal={() => setIsOpen(false)}
        />
        <div ref={bottomRef} style={{ height: '50px' }}></div>
      </div>
    </Suspense>
  );
}
