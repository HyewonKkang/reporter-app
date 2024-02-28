import useTopContents from '@/hooks/actions/useTopContents';
import { HTMLAttributes } from 'react';
import styles from './TopArticlesList.module.css';
import TopArticleItem from './TopArticleItem';
import ListSkeleton from './ListSkeleton';
import Result from '../result';

interface Props extends HTMLAttributes<HTMLUListElement> {
  selectedDate: Date;
  reporterId: string;
}

export default function TopArticlesList({ selectedDate, reporterId, ...rest }: Props) {
  const { data, error, isLoading } = useTopContents(reporterId, selectedDate);

  if (isLoading)
    return (
      <ul className={styles.list_wrapper} {...rest}>
        <ListSkeleton />
      </ul>
    );
  else if (error)
    return (
      <Result
        status='error'
        title='에러가 발생했습니다. 잠시 후 시도해주세요.'
        style={{ margin: '1rem 0' }}
      />
    );
  return (
    <ul className={styles.list_wrapper} {...rest}>
      {data?.map((content) => <TopArticleItem key={content.id} content={content} />)}
    </ul>
  );
}
