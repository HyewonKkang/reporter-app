import { api } from '@/lib/api';
import { FetchError } from '@/lib/error';
import useSWRImmutable from 'swr/immutable';

export default function useArticle({
  reporterId,
  contentId,
}: {
  reporterId?: number | string;
  contentId?: string;
}) {
  const { data, error } = useSWRImmutable<Content, FetchError>(
    `/api/content/${reporterId}/${contentId}`,
    api.get,
  );
  if (error) throw error;
  return { data };
}
