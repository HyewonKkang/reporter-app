import { api } from '@/lib/api';
import useSWRMutation from 'swr/mutation';
import { getKeys, infiniteConfigs } from '@/utils/swrInfinite';
import useSWRInfinite from 'swr/infinite';
import { toast } from 'react-toastify';

export default function useLikeGuestbook({ reporterId }: { reporterId: string }) {
  const updateLike = (url: string, { arg }: { arg: string }) =>
    api.put(`${url}?guestBookId=${arg}`);

  const { trigger } = useSWRMutation(`/api/guestbook/like`, updateLike);

  const getKey = getKeys('guestbook', reporterId);
  const { data, mutate } = useSWRInfinite<PageContent<Guestbook>>(getKey, api.get, infiniteConfigs);

  const handleLikeButton = async (guestBookId: string, pageIndex: number) => {
    mutate(
      data?.map((pageData, index) => {
        if (index === pageIndex) {
          return {
            ...pageData,
            content: pageData?.content?.map((content) => {
              if (content.id === guestBookId) {
                return {
                  ...content,
                  likeCount: content.likeCount + 1,
                };
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
      const updatedData = (await trigger(guestBookId)) as Guestbook;
      const newDataArray =
        data?.map((pageData, index) => {
          if (index === pageIndex) {
            return {
              ...pageData,
              content: pageData?.content?.map((content) => {
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
    } catch (error) {
      mutate(data, false);
      toast.error('다시 시도해주세요.');
    }
  };

  return { handleLikeButton };
}
