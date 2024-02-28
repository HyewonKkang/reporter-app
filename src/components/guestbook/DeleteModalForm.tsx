import React from 'react';
import Button from '../button';
import styles from './Guestbook.module.css';
import useDeleteGuestbook from '@/hooks/actions/useDeleteGuestbook';
import { useForm } from 'react-hook-form';

interface Props {
  closeModal?: () => void;
  guestBookId: Guestbook['id'];
  reporterId: number;
  pageIndex?: number;
}

export default function DeleteModalForm({ closeModal, reporterId, guestBookId }: Props) {
  const { handleSubmit } = useDeleteGuestbook({ reporterId, guestBookId, cb: closeModal });

  return (
    <form className={styles.delete_form} onSubmit={handleSubmit}>
      <div>
        해당 방명록을 삭제하시겠습니까?
        <div className={styles.modal_buttons}>
          <Button type='button' size={'large'} variant='outlined' onClick={closeModal}>
            취소
          </Button>
          <Button size={'large'} type='submit'>
            확인
          </Button>
        </div>
      </div>
    </form>
  );
}
