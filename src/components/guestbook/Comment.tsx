import React, { HTMLAttributes } from 'react';
import styles from './Guestbook.module.css';
import { FiEdit2 } from 'react-icons/fi';
import Button from '../button';
import useModal from '@/hooks/useModal';
import CommentModal from './CommentModal';
import { AiOutlineLike } from 'react-icons/ai';
import { format } from 'date-fns';
import { DATETIME_FORMAT } from '@/utils/date';

interface Props extends HTMLAttributes<HTMLDivElement> {
  data: Guestbook;
  filled?: boolean;
  edit?: boolean;
  pageIndex?: number;
  handleLikeButton: (guestBookId: string, pageIndex: number) => Promise<void>;
}

export default function Comment({
  data,
  filled = false,
  edit = true,
  handleLikeButton,
  pageIndex,
  ...rest
}: Props) {
  const { id, reporterId, content, createDt, writerName, likeCount } = data;
  const { ref, isOpen, setIsOpen } = useModal({
    initialMode: false,
  });

  const closeModal = () => setIsOpen(false);

  return (
    <div className={styles.comment_wrapper} {...rest}>
      <div className={`${styles.comment} ${filled ? styles.filled : ''}`}>
        <div className={styles.comment_header}>
          <div>
            <span className={styles.writer_name}>{writerName}</span>
            <span className={styles.create_dt}>{format(new Date(createDt), DATETIME_FORMAT)}</span>
          </div>
          <span className={styles.button_set}>
            {edit && (
              <Button variant='tag' onClick={() => setIsOpen(true)}>
                <FiEdit2 /> 편집
              </Button>
            )}
            {edit ? (
              <Button variant='tag' onClick={() => handleLikeButton(id, pageIndex ?? 0)}>
                <AiOutlineLike />
                {likeCount}
              </Button>
            ) : (
              <p className={styles.like_count}>
                <AiOutlineLike />
                {likeCount}
              </p>
            )}
          </span>
        </div>
        <div className={styles.content}>{content}</div>
      </div>
      <CommentModal
        ref={ref}
        open={isOpen}
        closeModal={closeModal}
        commentData={data}
        pageIndex={pageIndex}
      />
    </div>
  );
}
