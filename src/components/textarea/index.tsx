import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import styles from './Textarea.module.css';

export interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  text: string;
}

function Textarea(
  { disabled = false, cols = 80, rows = 10, ...rest }: Props,
  ref: React.Ref<HTMLTextAreaElement>,
) {
  return (
    <textarea
      className={styles.textarea}
      cols={cols}
      rows={rows}
      disabled={disabled}
      ref={ref}
      {...rest}
    />
  );
}

export default forwardRef(Textarea);
