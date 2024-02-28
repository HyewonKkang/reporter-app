import { useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import { api } from '@/lib/api';
import useSWRInfinite from 'swr/infinite';
import { getKeys, infiniteConfigs } from '@/utils/swrInfinite';
import { toast } from 'react-toastify';

export default function useUpdateGuestbook({
  defaultValues,
  cb,
  reporterId,
}: {
  defaultValues: GuestbookUpdateRequest;
  cb?: () => void;
  reporterId: number;
}) {
  const { register, handleSubmit, formState } = useForm<GuestbookUpdateRequest>({ defaultValues });

  const getKey = getKeys(`guestbook`, reporterId);
  const { data, mutate } = useSWRInfinite<PageContent<Guestbook>>(getKey, api.get, infiniteConfigs);

  const updateGuestbook = (url: string, { arg }: { arg: GuestbookUpdateRequest }) =>
    api.put(url, arg);

  const { trigger } = useSWRMutation(`/api/guestbook`, updateGuestbook);

  const onSubmit = async (pageIndex: number, submitData: GuestbookUpdateRequest) => {
    mutate(
      data?.map((pageData, index) => {
        if (index === pageIndex) {
          return {
            ...pageData,
            content: pageData?.content?.map((content: Guestbook) => {
              if (content.id === submitData.guestBookId) {
                return { ...content, ...submitData };
              }
              return content;
            }),
          };
        }
        return pageData;
      }),
      false,
    );

    try {
      const updatedData = (await trigger(submitData)) as Guestbook;

      const newDataArray =
        data?.map((pageData, index) => {
          if (index === pageIndex) {
            return {
              ...pageData,
              content: pageData?.content?.map((content: Guestbook) => {
                if (content.id === updatedData.id) {
                  return updatedData;
                }
                return content;
              }),
            };
          }
          return pageData;
        }) || [];

      mutate(newDataArray, false);
      toast.success('수정 완료되었습니다');
    } catch (error) {
      mutate(data, false);
      toast.error('수정에 실패했습니다.');
    } finally {
      cb?.();
    }
  };

  return {
    register,
    onSubmit,
    handleSubmit,
    formState,
  };
}
