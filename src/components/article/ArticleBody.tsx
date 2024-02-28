import React from 'react';
import { makeThumbnail } from '@/utils/thumbnail';
import styles from './Article.module.css';

interface Props extends Pick<Content, 'bodyText' | 'thumbnailUrl' | 'title'> {}

export default function ArticleBody({ bodyText, thumbnailUrl, title }: Props) {
  const lines = bodyText?.split('\n');

  return (
    <section className={styles.body}>
      <div className={styles.thumbnail}>
        {thumbnailUrl && <img src={makeThumbnail(thumbnailUrl, 'R750x0')} alt={title} />}
      </div>
      <div className={styles.body_text}>{lines?.map((line, idx) => <p key={idx}>{line}</p>)}</div>
    </section>
  );
}
