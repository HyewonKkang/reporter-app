import React, { HTMLAttributes } from 'react';
import styles from './List.module.css';

interface Props extends HTMLAttributes<HTMLHeadingElement> {}

export default function ListTitle({ children }: Props) {
  return (
    <div className={styles.list_title}>
      <h2>{children}</h2>
    </div>
  );
}
