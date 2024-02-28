import React, { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import styles from './Input.module.css';
import { UseFormRegister } from 'react-hook-form';
import { renderAddon } from '@/utils/render';

export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  register?: UseFormRegister<any>;
  size?: 'small' | 'large';
  rightAddon?: React.ReactNode;
}

function Input(
  { size = 'large', rightAddon, ...rest }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const right = renderAddon(rightAddon, { className: 'input_icon_right' });
  return (
    <div className={styles.input_wrapper}>
      <input
        className={`${styles.textfield} ${styles[size]} ${right ? styles.has_right_addon : ''}`}
        ref={ref}
        {...rest}
      />
      {right}
    </div>
  );
}

export default forwardRef(Input);
