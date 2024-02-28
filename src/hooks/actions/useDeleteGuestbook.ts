import useSWRMutation from 'swr/mutation';
import { api } from '@/lib/api';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function useDeleteGuestbook({
  guestBookId,
  cb,
  reporterId,
}: {
  guestBookId: string;
  cb?: () => void;
  reporterId: number;
}) {
  const { handleSubmit } = useForm();

  const deleteGuestbook = (url: string) => api.delete(url);

  const { trigger } = useSWRMutation(`/api/guestbook?guestBookId=${guestBookId}`, deleteGuestbook);

  const onSubmit = async () => {
    try {
      await trigger();
      window?.location.reload();
      toast.success('삭제 완료되었습니다');
    } catch (error) {
      toast.error('삭제에 실패했습니다.');
    } finally {
      cb?.();
    }
  };

  return { handleSubmit: handleSubmit(onSubmit) };
}
