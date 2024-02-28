import React, { forwardRef, Ref } from 'react';
import styles from './Form.module.css';
import { UseFormRegister } from 'react-hook-form';
import Input, { Props as InputProps } from '@/components/input';
import Toggle, { Props as ToggleProps } from '../toggle';
import Textarea, { Props as TextareaProps } from '../textarea';

type Props = (InputProps | TextareaProps | ToggleProps) & {
  type?: 'input' | 'toggle' | 'textarea';
  register?: UseFormRegister<any>;
  label: string;
  text: string;
  inputType?: string;
};

function Field(
  { type = 'input', label, text, style, inputType, ...rest }: Props,
  ref: Ref<HTMLInputElement | HTMLTextAreaElement>,
) {
  return (
    <div className={styles.field} style={style}>
      <label htmlFor={label}>{text}</label>
      {type === 'input' ? (
        <Input
          id={label}
          ref={ref as Ref<HTMLInputElement>}
          type={inputType || 'text'}
          {...(rest as InputProps)}
        />
      ) : type === 'toggle' ? (
        <Toggle
          className={styles.toggle}
          id={label}
          ref={ref as Ref<HTMLInputElement>}
          {...(rest as ToggleProps)}
        />
      ) : (
        <Textarea id={label} ref={ref as Ref<HTMLTextAreaElement>} {...(rest as TextareaProps)} />
      )}
    </div>
  );
}

export default forwardRef(Field);
