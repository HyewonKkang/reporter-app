import React from 'react';
import { Skeleton } from '../skeleton';
import styles from './Article.module.css';

export default function ArticleSkeleton() {
  return (
    <div>
      <div className={styles.head}>
        <Skeleton type={'text'} width={'80%'} height={'35px'} style={{ marginBottom: '1rem' }} />
        <Skeleton type={'text'} height={'16px'} className={styles.keywords} />
        <Skeleton type={'text'} height={'35px'} className={styles.info_wrapper} />
      </div>
      <section className={styles.body}>
        <Skeleton
          type={'thumbnail'}
          width={'750px'}
          height={'500px'}
          className={styles.thumbnail}
        />
        <Skeleton type={'paragraph'} height={'500px'} style={{ marginTop: '24px' }} />
      </section>
    </div>
  );
}
