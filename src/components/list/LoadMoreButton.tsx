import React, { ButtonHTMLAttributes } from 'react';
import Button from '../button';
import styles from './List.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function LoadMoreButton({ ...rest }: Props) {
  return (
    <div className={styles.more_button_wrapper}>
      <Button variant={'outlined'} size={'large'} style={{ width: '200px' }} {...rest}>
        더보기
      </Button>
    </div>
  );
}
