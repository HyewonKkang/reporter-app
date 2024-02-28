import React from 'react';
import styles from './TopArticlesList.module.css';
import { BiSolidUpArrow } from 'react-icons/bi';
import Link from 'next/link';
import { formatNumberWithFraction } from '@/utils/common';

interface Props {
  content: Content & { rank?: number };
}

export default function TopArticleItem({ content }: Props) {
  const { rank, title, pv, reporterId, contentId } = content;
  return (
    <li className={styles.article_list_item}>
      <Link href={`/content/${reporterId}/${contentId}`} prefetch={false}>
        <div className={styles.rank}>{rank}</div>
        <div className={styles.title}>{title}</div>
        <div className={styles.pv}>{formatNumberWithFraction(pv)}</div>
        <BiSolidUpArrow size={16} color={'rgb(3, 51, 161)'} />
      </Link>
    </li>
  );
}
