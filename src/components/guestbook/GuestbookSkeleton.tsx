import React, { HTMLAttributes } from 'react';
import styles from './Guestbook.module.css';
import { Skeleton } from '../skeleton';

interface Props extends HTMLAttributes<HTMLDivElement> {
  count: number;
}

export default function GuestbookSkeleton({ count, ...rest }: Props) {
  return (
    <div className={styles.guestbook_list} {...rest}>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className={styles.skeleton_item}>
          <Skeleton type={'paragraph'} height={'134px'} width={'100%'} />
        </div>
      ))}
    </div>
  );
}
