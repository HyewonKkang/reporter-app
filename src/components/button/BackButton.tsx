import Link from 'next/link';
import React from 'react';
import Button from '.';
import styles from './Button.module.css';

export default function BackButton({ reporterId }: { reporterId: string }) {
  return (
    <Link href={`/reporter/${reporterId}`} className={styles.back_button}>
      <Button variant={'text'}>← 기자 페이지로 돌아가기</Button>
    </Link>
  );
}
