'use client';

import { api } from '@/lib/api';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import useSWRImmutable from 'swr/immutable';
import useSWRMutation from 'swr/mutation';

export default function useLike(putUrl: string, getUrl: string) {
  const { mutate } = useSWRConfig();
  const { trigger, data } = useSWRMutation(putUrl, (path: string) => api.put(path), {
    revalidate: true,
  });

  const { data: currentData } = useSWRImmutable(getUrl);

  const fieldName = putUrl.includes('/reporter') ? 'favoriteCount' : 'likeCount';

  const handleLikeButton = async () => {
    mutate(
      getUrl,
      { ...currentData, [fieldName]: currentData[fieldName] + 1 },
      { revalidate: false },
    );
    try {
      await trigger?.();
      mutate(getUrl);
    } catch (error) {
      mutate(getUrl, currentData, { revalidate: false });
      toast.error('좋아요에 실패했습니다.');
    }
  };

  return { handleLikeButton, data };
}
