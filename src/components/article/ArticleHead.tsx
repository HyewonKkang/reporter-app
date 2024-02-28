import React from 'react';
import styles from './Article.module.css';
import { format } from 'date-fns';
import Link from 'next/link';
import Button from '../button';
import LikeButton from '../button/LikeButton';
import { DATETIME_FORMAT } from '@/utils/date';
import { useRouter } from 'next/navigation';
import { sessionStorageHandler } from '@/lib/storageHandler';

interface Props {
  contentData: Content & { reporterName?: string };
}

export default function ArticleHead({ contentData }: Props) {
  const {
    createDt,
    likeCount,
    keyword,
    subtitle,
    title,
    contentUrl,
    reporterId,
    contentId,
    reporterName,
  } = contentData;
  const subtitle_lines = subtitle?.split('<br/>');
  const router = useRouter();

  const handleKeywordTag = (keyword: string) => {
    router.push(`/reporter/${reporterId}?keyword=${keyword}`);
    sessionStorageHandler.remove('scrollIndex');
  };

  return (
    <div className={styles.head}>
      <h3>{title}</h3>
      <h4>
        {subtitle_lines?.map((line: string, idx: number) => (
          <React.Fragment key={idx}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </h4>
      <div className={styles.keywords}>
        {keyword?.map((word: string, idx: number) => (
          <Button key={idx} variant='tag' onClick={() => handleKeywordTag(word)}>
            #{word}
          </Button>
        ))}
      </div>
      <div className={styles.info_wrapper}>
        <div className={styles.head_info}>
          <Link href={`/reporter/${reporterId}`} prefetch={false}>
            <span>{reporterName && `${reporterName}`}</span>
          </Link>{' '}
          | {createDt && format(new Date(createDt), DATETIME_FORMAT)}
        </div>
        <div className={styles.variety_wrapper}>
          {contentUrl && (
            <Link href={contentUrl} prefetch={false}>
              <Button variant='tag'>기사원문</Button>
            </Link>
          )}
          <LikeButton
            likeCount={likeCount}
            putUrl={`/api/content/${reporterId}/${contentId}/like`}
            getUrl={`/api/content/${reporterId}/${contentId}`}
          />
        </div>
      </div>
    </div>
  );
}
