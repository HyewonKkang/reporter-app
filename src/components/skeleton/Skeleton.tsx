import React, { HTMLAttributes } from 'react';
import styles from './Skeleton.module.css';

interface Props extends HTMLAttributes<HTMLDivElement> {
  type?: 'avatar' | 'text' | 'thumbnail' | 'paragraph';
  width?: string;
  height?: string;
}

export default function Skeleton({ type, width, height, style, className, ...rest }: Props) {
  return (
    <div
      className={`${styles.skeleton} ${styles[type as string]} ${className ?? ''}`}
      style={{ width, height, ...style }}
      {...rest}
    ></div>
  );
}
