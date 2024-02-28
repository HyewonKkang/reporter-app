import React, { ForwardedRef, HTMLAttributes, forwardRef } from 'react';
import styles from './Modal.module.css';

interface Props extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
}

function Modal({ open, children, ...rest }: Props, ref: ForwardedRef<any>) {
  return open ? (
    <div className={styles.backdrop}>
      <div className={styles.container} ref={ref} {...rest}>
        {children}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default forwardRef(Modal);
