import React, { FormHTMLAttributes } from 'react';
import Field from '../form';
import styles from './Guestbook.module.css';
import Button from '../button';
import useUpdateGuestbook from '@/hooks/actions/useUpdateGuestbook';

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  closeModal?: () => void;
  commentData: Guestbook;
  pageIndex?: number;
}

export default function EditModalForm({ closeModal, commentData, pageIndex, ...rest }: Props) {
  const { id, content, writerName } = commentData;

  const { handleSubmit, register, formState, onSubmit } = useUpdateGuestbook({
    defaultValues: {
      guestBookId: id,
      content,
      writerName,
    },
    cb: closeModal,
    reporterId: commentData?.reporterId,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit.bind(null, pageIndex ?? 0))}
      className={styles.edit_form}
      {...rest}
    >
      <Field
        type='input'
        label='writerName'
        text='작성자'
        style={{ width: '100%' }}
        {...register('writerName')}
      />
      <Field
        type='textarea'
        label='content'
        text='내용'
        style={{ width: '100%' }}
        {...register('content')}
      />
      <div className={styles.modal_buttons}>
        <div className={styles.modal_buttons}>
          <Button type='button' size={'large'} variant='outlined' onClick={closeModal}>
            취소
          </Button>
          <Button
            size={'large'}
            type='submit'
            disabled={!formState.isValid || Object.keys(formState.dirtyFields).length === 0}
          >
            확인
          </Button>
        </div>
      </div>
    </form>
  );
}
