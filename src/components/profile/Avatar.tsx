import React, { ImgHTMLAttributes } from 'react';
import styles from './profile.module.css';
import { FaUserCircle } from 'react-icons/fa';
import { makeThumbnail } from '@/utils/thumbnail';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  profileImg?: string;
  color?: string;
  size?: number;
}

function Avatar({ profileImg, color = 'white', size = 100, ...rest }: Props) {
  return (
    <div className={styles.profile_img} style={{ width: `${size}px`, height: `${size}px` }}>
      {profileImg ? (
        <img src={makeThumbnail(profileImg, `C${size}x${size}`)} alt={'profile image'} {...rest} />
      ) : (
        <FaUserCircle color={color} size={size} />
      )}
    </div>
  );
}

export default Avatar;
