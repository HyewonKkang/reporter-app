import React from 'react';
import styles from './ReporterGrid.module.css';
import Avatar from '../profile/Avatar';
import Link from 'next/link';
import { formatNumberWithFraction } from '@/utils/common';
import { AiOutlineLike } from 'react-icons/ai';

interface Props {
  data: Reporter;
}

export default function GridItem({ data }: Props) {
  const { id, name, profileImageUrl, description, favoriteCount } = data;

  return (
    <Link href={`/reporter/${id}`} prefetch={false}>
      <div className={styles.grid_item}>
        <Avatar profileImg={profileImageUrl} size={70} color={'grey'} />
        <div className={styles.grid_item_body}>
          <p className={styles.grid_item_name}>{name}</p>
          <p className={styles.grid_item_desc}>{description}</p>
          <p className={styles.grid_item_favorite}>
            <AiOutlineLike /> {formatNumberWithFraction(favoriteCount)}
          </p>
        </div>
      </div>
    </Link>
  );
}
