'use client';

import React, { HTMLAttributes } from 'react';
import styles from './profile.module.css';
import Avatar from './Avatar';
import { makeThumbnail } from '@/utils/thumbnail';
import { MdModeEditOutline } from 'react-icons/md';
import ProfileForm from './ProfileForm';
import Modal from '../modal';
import LikeButton from '../button/LikeButton';
import useModal from '@/hooks/useModal';
import useReporterProfile from '@/hooks/actions/useReporterProfile';
import { ProfileSkeleton } from '../skeleton';
import Button from '../button';
import Link from 'next/link';
import { renderAddon } from '@/utils/render';

interface Props extends HTMLAttributes<HTMLUListElement> {
  reporterId: string;
  isOwned: boolean;
}

export default function Profile({ reporterId, isOwned }: Props) {
  const { data: profileData, isLoading } = useReporterProfile(reporterId);
  const { ref, isOpen, setIsOpen } = useModal({
    initialMode: false,
  });

  const toggleProfileMode = () => setIsOpen((prev) => !prev);

  const guestbookButton = <Button variant={'tag'}>방명록</Button>;

  const insightButton = <Button variant={'tag'}>인사이트</Button>;

  if (isLoading) return <ProfileSkeleton />;

  const {
    name,
    description,
    profileImageUrl,
    backgroundImageUrl,
    favoriteCount,
    useComment,
    useInsight,
  } = profileData as Reporter;

  return (
    <>
      <article className={styles.profile_wrapper}>
        <div
          style={{
            backgroundImage: backgroundImageUrl
              ? `url('${makeThumbnail(backgroundImageUrl, 'C1200x300')}')`
              : '',
          }}
          className={styles.profile}
        >
          <div className={styles.avatar}>
            <Avatar profileImg={profileImageUrl} />
            {isOwned && (
              <MdModeEditOutline
                color='white'
                size={20}
                className={styles.edit_button}
                onClick={toggleProfileMode}
              />
            )}
          </div>
          <div className={styles.profile_name}>
            <div>{name}</div>
          </div>
          <div className={styles.profile_description}>{description}</div>
          <div className={styles.tags}>
            <LikeButton
              likeCount={favoriteCount}
              putUrl={`/api/reporter/${reporterId}/favorite`}
              getUrl={`/api/reporter/${reporterId}`}
              disabled={isOwned}
            />
            {!isOwned && !useInsight ? (
              renderAddon(insightButton, { disabled: true })
            ) : (
              <Link href={`/insight/${reporterId}`} prefetch={false}>
                {insightButton}
              </Link>
            )}
            {!isOwned && !useComment ? (
              renderAddon(guestbookButton, { disabled: true })
            ) : (
              <Link href={`/guestbook/${reporterId}`} prefetch={false}>
                {guestbookButton}
              </Link>
            )}
          </div>
        </div>
      </article>
      {profileData && (
        <Modal open={isOpen} ref={ref}>
          <ProfileForm profileData={profileData} toggleProfileMode={toggleProfileMode} />
        </Modal>
      )}
    </>
  );
}
