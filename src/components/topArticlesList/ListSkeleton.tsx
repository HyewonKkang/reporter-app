import React from 'react';
import { Skeleton } from '../skeleton';

export default function ListSkeleton() {
  const skeletonProps = {
    width: '100%',
    height: '28px',
    style: { margin: '.5rem .2rem' },
  };

  return (
    <>
      <Skeleton type={'text'} {...skeletonProps} />
      <Skeleton type={'text'} {...skeletonProps} />
      <Skeleton type={'text'} {...skeletonProps} />
      <Skeleton type={'text'} {...skeletonProps} />
      <Skeleton type={'text'} {...skeletonProps} />
    </>
  );
}
