import React from 'react';
import { Skeleton } from '.';
import styles from './Skeleton.module.css';

export default function ListSkeleton({ count }: { count: number }) {
  return (
    <main>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className={styles.list_item}>
          <Skeleton type={'thumbnail'} style={{ margin: '1rem' }} />
          <div className={styles.list_content}>
            <Skeleton
              type={'text'}
              width={'200px'}
              style={{ marginBottom: '12px', marginTop: '-12px' }}
            />
            <Skeleton
              type={'text'}
              width={'80%'}
              height={'1rem'}
              style={{ marginBottom: '.3rem' }}
            />
            <Skeleton type={'text'} width={'100%'} height={'1rem'} />
          </div>
        </div>
      ))}
    </main>
  );
}
