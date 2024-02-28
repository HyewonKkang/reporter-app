'use client';

import React from 'react';
import ArticleHead from './ArticleHead';
import styles from './Article.module.css';
import ArticleBody from './ArticleBody';
import useArticle from '@/hooks/actions/useArticle';
import DeletedArticle from './DeletedArticle';

interface Props {
  reporterId: string;
  contentId: string;
  reporterName?: string;
}

export default function Article({ reporterId, contentId, reporterName, ...rest }: Props) {
  const { data } = useArticle({ reporterId, contentId });
  const { bodyText, thumbnailUrl, title } = data || {};

  return (
    data &&
    (data.delete || data.id == null ? (
      <DeletedArticle reporterId={reporterId} />
    ) : (
      <article className={styles.article} {...rest}>
        <ArticleHead contentData={{ ...data, reporterName }} />
        <ArticleBody bodyText={bodyText} thumbnailUrl={thumbnailUrl} title={title} />
      </article>
    ))
  );
}
