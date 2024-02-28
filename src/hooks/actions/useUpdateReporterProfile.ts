import { api } from '@/lib/api';
import { useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import useReporterProfile from './useReporterProfile';
import { merge } from 'lodash-es';
import { toast } from 'react-toastify';

export default function useUpdateReporterProfile({
  defaultValues,
  cb,
  reporterId,
}: {
  defaultValues: ReporterUpdateRequest;
  cb?: () => void;
  reporterId: number;
}) {
  const { register, handleSubmit, formState } = useForm<ReporterUpdateRequest>({ defaultValues });

  const updateReporter = (
    url: string,
    { arg }: { arg: ReporterUpdateRequest },
  ): Promise<Reporter> => api.put(url, arg);

  const { data: prevProfile, mutate } = useReporterProfile(reporterId + '');

  const { trigger } = useSWRMutation(`/api/reporter/${reporterId}`, updateReporter);

  const onSubmit = async (data: ReporterUpdateRequest) => {
    const updated = merge(prevProfile, data);
    mutate(updated, { revalidate: false });
    try {
      const res = await trigger(data);
      mutate(res, { revalidate: false });
      toast.success('수정 완료되었습니다');
    } catch (error) {
      toast.error('수정에 실패했습니다.');
    } finally {
      cb?.();
    }
  };

  return { register, handleSubmit: handleSubmit(onSubmit), formState };
}
