import { useRef } from 'react';
import Input from '../input';
import Button from '../button';
import styles from './Guestbook.module.css';
import { useForm } from 'react-hook-form';

interface Props {
  closeModal?: () => void;
  verifyWriter: (input: string) => boolean;
}

export default function VerificationForm({ closeModal, verifyWriter }: Props) {
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = (data: { writerKey?: string }) => {
    const res = verifyWriter(data.writerKey || '');
    if (!res) reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p>확인번호를 입력해주세요.</p>
        <Input
          type='password'
          style={{ width: '100%', textAlign: 'center' }}
          {...register('writerKey')}
        />
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
