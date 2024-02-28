'use client';

import { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { BiSolidToTop } from 'react-icons/bi';
import styles from './FAB.module.css';
import { throttle } from 'lodash-es';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const THROTTLE_DELAY = 500;

export default function ScrollToTop({ ...rest }: Props) {
  const [show, setShow] = useState<boolean>(false);
  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleShowButton = throttle(() => setShow(window.scrollY > 500), THROTTLE_DELAY);

    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  return show ? (
    <div className={styles.wrapper}>
      <button className={styles.fab} {...rest}>
        <BiSolidToTop size={30} onClick={scrollToTop} color={'black'} />
      </button>
    </div>
  ) : (
    <></>
  );
}
