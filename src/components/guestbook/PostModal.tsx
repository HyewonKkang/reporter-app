import React, { ForwardedRef, HTMLAttributes, forwardRef } from 'react';
import Field from '../form';
import styles from './Guestbook.module.css';
import Button from '../button';
import Modal from '../modal';
import usePostGuestbook from '@/hooks/actions/usePostGuestbook';

interface Props extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  closeModal?: () => void;
  reporterId: string;
}

function PostModal({ reporterId, closeModal, open }: Props, ref: ForwardedRef<HTMLDivElement>) {
  const { handleSubmit, register, formState } = usePostGuestbook({
    cb: closeModal,
    reporterId: +reporterId,
  });

  return (
    <Modal open={open} ref={ref}>
      <div className={styles.comment_modal}>
        <h3>방명록 작성</h3>
        <form onSubmit={handleSubmit} className={styles.edit_form}>
          <Field
            type='input'
            label='writerName'
            text='작성자'
            style={{ width: '100%' }}
            {...register('writerName', { required: '작성자를 입력해주세요.' })}
          />
          <Field
            type='input'
            label='writerKey'
            text='확인번호'
            inputType='password'
            style={{ width: '100%' }}
            {...register('writerKey', { required: '확인번호를 입력해주세요.' })}
          />
          <Field
            type='textarea'
            label='content'
            text='내용'
            style={{ width: '100%' }}
            {...register('content', {
              required: '내용을 입력해주세요.',
            })}
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
      </div>
    </Modal>
  );
}

export default forwardRef(PostModal);
