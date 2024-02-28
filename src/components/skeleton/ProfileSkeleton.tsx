import React from 'react';
import { Skeleton } from '.';

export default function ProfileSkeleton() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '300px',
        justifyContent: 'center',
      }}
    >
      <Skeleton type={'avatar'} style={{ marginBottom: '1rem' }} />
      <Skeleton type={'text'} width={'200px'} style={{ marginBottom: '1.2rem' }} />
      <Skeleton type={'text'} width={'300px'} />
    </div>
  );
}
