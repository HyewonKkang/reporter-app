import { FetchError } from '@/lib/error';
import useSWRImmutable from 'swr';

export default function useReporterProfile(reporterId: string) {
  const { error, ...result } = useSWRImmutable<Reporter, FetchError>(`/api/reporter/${reporterId}`);
  if (error) throw error;
  return result;
}
