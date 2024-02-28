import React from 'react';
import styles from './List.module.css';
import ListItem from './ListItem';
import Result from '../result';

interface Props {
  previewData?: Content[];
}

export default function ListPreview({ previewData }: Props) {
  return (
    <div className={styles.list_preview_wrapper}>
      {previewData && previewData?.length > 0 ? (
        previewData.map((content: Content) => <ListItem rowData={content} />)
      ) : (
        <Result title={'표시될 컨텐츠가 없습니다.'} />
      )}
    </div>
  );
}
