import Link from 'next/link';
import React, { HTMLAttributes, memo } from 'react';
import styles from './List.module.css';
import { AiOutlineLike } from 'react-icons/ai';
import { makeThumbnail } from '@/utils/thumbnail';
import Image from 'next/image';
import { format } from 'date-fns';

interface Props extends HTMLAttributes<HTMLDivElement> {
  rowData: Content;
}

function ListItem({ rowData, ...rest }: Props) {
  const {
    title,
    thumbnailUrl,
    subtitle,
    bodyText,
    contentId,
    likeCount,
    keyword,
    createDt,
    reporterId,
  } = rowData;

  return (
    <Link href={`/content/${reporterId}/${contentId}`} prefetch={false}>
      <div className={styles.list_item} {...rest}>
        {thumbnailUrl && (
          <Image
            src={makeThumbnail(thumbnailUrl, 'C180x130')}
            className={styles.thumbnail}
            alt={title ?? 'thumbnail'}
            width={180}
            height={130}
          />
        )}
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div>
            <div className={styles.keywords}>
              {keyword?.map((word, idx) => <span key={idx}>#{word} </span>)}
            </div>
            <p className={styles.subtitle}>{subtitle ?? bodyText}</p>
          </div>
        </div>
        <div className={styles.meta}>
          {createDt && (
            <p className={styles.created_date}>{format(new Date(createDt), 'yyyy/MM/dd')}</p>
          )}
          <p className={styles.like_count}>
            <AiOutlineLike />
            {likeCount}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default memo(ListItem);
