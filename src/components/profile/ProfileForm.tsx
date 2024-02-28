import { FormHTMLAttributes, useState } from 'react';
import Avatar from '@/components/profile/Avatar';
import styles from './profile.module.css';
import Button from '../button';
import { makeThumbnail } from '@/utils/thumbnail';
import Field from '../form/Field';
import useUpdateReporterProfile from '@/hooks/actions/useUpdateReporterProfile';

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  toggleProfileMode?: () => void;
  profileData: Reporter;
}

export default function ProfileForm({ toggleProfileMode, profileData, ...rest }: Props) {
  const { name, description, profileImageUrl, backgroundImageUrl, useComment, useInsight, id } =
    profileData as Reporter;
  const { register, handleSubmit, formState } = useUpdateReporterProfile({
    defaultValues: {
      name,
      description,
      profileImageUrl,
      backgroundImageUrl,
      useComment,
      useInsight,
    },
    cb: toggleProfileMode,
    reporterId: id,
  });

  const [backgroundImage, setBackgroundImage] = useState(backgroundImageUrl);
  const [profileImage, setProfileImage] = useState(profileImageUrl);

  return (
    <form onSubmit={handleSubmit} {...rest}>
      <div
        className={styles.edit_profile_background}
        style={{
          backgroundImage: backgroundImage
            ? `url('${makeThumbnail(backgroundImage, 'C1200x300')}')`
            : '',
        }}
      >
        <Avatar profileImg={profileImage} size={200} />
      </div>
      <div className={styles.edit_profile_content_wrapper}>
        <div className={styles.edit_profile_content}>
          <Field
            type='input'
            label='name'
            text='이름'
            {...register('name', { required: '이름은 입력해주세요.' })}
          />
          <Field
            type='input'
            label='description'
            text='자기소개 문구'
            {...register('description')}
          />
          <Field type='toggle' label='useInsight' text='통계 기능' {...register('useInsight')} />
          <Field type='toggle' label='useComment' text='방명록 기능' {...register('useComment')} />
          <div className={styles.form_buttons}>
            <Button type='button' variant='outlined' onClick={toggleProfileMode}>
              Back
            </Button>
            <Button
              size={'large'}
              type='submit'
              disabled={!formState.isValid || Object.keys(formState.dirtyFields).length === 0}
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
