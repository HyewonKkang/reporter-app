import React from 'react';
import Input, { Props as CommonInputProps } from '../input';
import { FiSearch } from 'react-icons/fi';
import styles from './searchinput.module.css';
import { FormState, FieldValues, UseFormRegister } from 'react-hook-form';

interface Props extends CommonInputProps {
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  formState: FormState<FieldValues>;
  register: UseFormRegister<SearchRequest>;
  searchKeyword?: string;
}

export default function SearchInput({
  handleSubmit,
  formState,
  register,
  searchKeyword,
  ...rest
}: Props) {
  return (
    <form className={styles.search_input_wrapper} onSubmit={handleSubmit}>
      <Input
        aria-label={'search input'}
        defaultValue={searchKeyword || ''}
        rightAddon={
          <button
            type='submit'
            aria-label={'search button'}
            disabled={!formState.isValid || Object.keys(formState.dirtyFields).length === 0}
          >
            <FiSearch />
          </button>
        }
        {...register('keyword')}
        {...rest}
      />
    </form>
  );
}
