import { sessionStorageHandler } from '@/lib/storageHandler';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function useSearchContent(searchKeyword?: string) {
  const { handleSubmit, register, formState, reset } = useForm();
  const [keyword, setKeyword] = useState<string | undefined>(searchKeyword || '');

  const onSubmit = async (data: SearchRequest) => {
    setKeyword(data.keyword);
    sessionStorageHandler.remove('scrollIndex');
  };

  const clearSearch = () => {
    reset();
    setKeyword(undefined);
    sessionStorageHandler.remove('scrollIndex');
  };

  return { handleSubmit: handleSubmit(onSubmit), formState, register, keyword, clearSearch };
}
