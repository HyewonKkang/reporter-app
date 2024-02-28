import React, { HTMLAttributes } from 'react';
import styles from './Header.module.css';
import Link from 'next/link';
import { getLoginAuth } from '@/actions/auth';
import Button from '@/components/button';
import { headers } from 'next/headers';
import config from '@/configs/env';
import { MdHome } from 'react-icons/md';

interface Props extends HTMLAttributes<HTMLElement> {}

export const getCurrentURI = () => {
  const headersList = headers();
  const protocol = headersList.get('x-protocol');
  const host = headersList.get('host');
  const pathname = headersList.get('x-pathname');
  return `${protocol}//${host}${pathname}`;
};

export default async function Header({ ...rest }: Props) {
  const isLogin = await getLoginAuth();
  const redirectParam = `${getCurrentURI()}`;

  return (
    <header className={styles.header} {...rest}>
      <div>
        <Link href={`/`} aria-label={'home'}>
          <MdHome color={'white'} size={30} />
        </Link>
      </div>
      <div>
        {isLogin ? (
          <Link href={`${config.NEXT_PUBLIC_DAUM_LOGOUT_URL}?continue=${redirectParam}`}>
            <Button>로그아웃</Button>
          </Link>
        ) : (
          <Link href={`${config.NEXT_PUBLIC_DAUM_LOGIN_URL}?url=${redirectParam}`}>
            <Button>로그인</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
