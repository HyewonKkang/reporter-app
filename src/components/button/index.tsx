import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'text' | 'outlined' | 'tag';
  size?: 'small' | 'medium' | 'large';
  underline?: boolean;
}

export default function Button({
  variant = 'contained',
  size = 'medium',
  type = 'button',
  underline,
  ...rest
}: Props) {
  return (
    <button
      className={`${styles[variant]} ${styles[size]} ${
        variant === 'text' && underline && styles.underline
      }`}
      type={type}
      {...rest}
    />
  );
}
