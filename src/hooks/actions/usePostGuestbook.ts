import { api } from '@/lib/api';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useSWRMutation from 'swr/mutation';

export default function usePostGuestbook({
  cb,
  reporterId,
}: {
  cb?: () => void;
  reporterId: number;
}) {
  const { handleSubmit, register, formState } = useForm<GuestbookCreateRequest>();
  const postGuestbook = (url: string, { arg }: { arg: GuestbookCreateRequest }) =>
    api.post(url, arg);

  const { trigger } = useSWRMutation(`/api/guestbook`, postGuestbook);

  const onSubmit = async (data: GuestbookCreateRequest) => {
    const reqBody = {
      ...data,
      reporterId,
    };

    try {
      await trigger(reqBody);
      window?.location.reload();
      toast.success('작성 완료되었습니다');
    } catch (error) {
      toast.error('작성에 실패했습니다.');
    } finally {
      cb?.();
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    formState,
  };
}
