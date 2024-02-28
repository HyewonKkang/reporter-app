'use client';

import React from 'react';
import List from '../list';
import ListTitle from '../list/ListTitle';
import SearchInput from '../searchInput';
import useSearchContent from '@/hooks/actions/useSearchContent';
import { useSearchParams } from 'next/navigation';
import styles from './SearchableList.module.css';

interface Props {
  reporterId?: string;
  initialData?: PageContent<Content>[];
}

export default function SearchableList({ reporterId, initialData }: Props) {
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get('keyword') ?? undefined;
  const { keyword, clearSearch, ...searchInputProps } = useSearchContent(searchKeyword);

  return (
    <>
      <div className={styles.searchable_list_wrapper}>
        <ListTitle>전체 기사</ListTitle>
        <SearchInput searchKeyword={searchKeyword} {...searchInputProps} />
      </div>
      <List
        reporterId={reporterId}
        initialData={initialData}
        keyword={keyword}
        clearSearch={clearSearch}
      />
    </>
  );
}
