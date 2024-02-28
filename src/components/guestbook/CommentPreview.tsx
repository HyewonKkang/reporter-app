import React, { HTMLAttributes } from 'react';
import styles from './Guestbook.module.css';
import { AiOutlineLike } from 'react-icons/ai';
import { format } from 'date-fns';
import { DATE_FORMAT } from '@/utils/date';

interface Props extends HTMLAttributes<HTMLDivElement> {
  data: Guestbook;
  filled?: boolean;
}

export default function CommentPreview({ data, filled = false, ...rest }: Props) {
  const { content, createDt, writerName, likeCount } = data;

  return (
    <div className={styles.comment_wrapper} {...rest}>
      <div className={`${styles.comment} ${filled ? styles.filled : ''}`}>
        <div className={styles.comment_header}>
          <div>
            <span className={styles.writer_name}>{writerName}</span>
            <span className={styles.create_dt}>{format(createDt, DATE_FORMAT)}</span>
          </div>
          <span className={styles.button_set}>
            <p className={styles.like_count}>
              <AiOutlineLike />
              {likeCount}
            </p>
          </span>
        </div>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
}
