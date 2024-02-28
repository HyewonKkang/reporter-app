import React, { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';
import styles from './Toggle.module.css';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {}

function Toggle({ ...rest }: Props, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <label className={styles.toggle}>
      <input type='checkbox' {...rest} ref={ref} />
      <span></span>
    </label>
  );
}

export default forwardRef(Toggle);
