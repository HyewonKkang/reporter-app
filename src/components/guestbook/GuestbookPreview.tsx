'use client';

import React from 'react';
import styles from './Guestbook.module.css';
import CommentPreview from './CommentPreview';
import Result from '../result';

interface Props {
  previewData?: Guestbook[];
}

export default function GuestBookPreview({ previewData }: Props) {
  return (
    <div className={styles.guestbook_wrapper}>
      {previewData && previewData?.length > 0 ? (
        previewData.map((comment) => <CommentPreview key={comment.id} data={comment} />)
      ) : (
        <Result title={'표시될 컨텐츠가 없습니다.'} />
      )}
    </div>
  );
}
