import React, { HTMLAttributes, ReactElement } from 'react';
import styles from './Result.module.css';
import {
  IoIosWarning,
  IoIosCloseCircle,
  IoIosCheckmarkCircle,
  IoIosInformationCircle,
} from 'react-icons/io';
import { renderAddon } from '@/utils/render';
import { match } from 'ts-pattern';

type Status = 'info' | 'success' | 'warning' | 'error';

interface Props extends HTMLAttributes<HTMLDivElement> {
  status?: Status;
  title: string;
  subTitle?: string;
  hasBorder?: boolean;
}

const getResultIconByStatus = (status: Status): ReactElement => {
  return match<Status, ReactElement>(status)
    .with('info', () => <IoIosInformationCircle color={'#005FFC'} />)
    .with('success', () => <IoIosCheckmarkCircle color={'#00C021'} />)
    .with('warning', () => <IoIosWarning color={'#FFA825'} />)
    .with('error', () => <IoIosCloseCircle color={'#FF464A'} />)
    .otherwise(() => <IoIosInformationCircle color={'#005FFC'} />);
};

export default function Result({
  status = 'info',
  title,
  subTitle,
  hasBorder = true,
  children,
  ...rest
}: Props) {
  const icon = renderAddon(getResultIconByStatus(status), { size: 60 });
  return (
    <div className={`${styles.result_wrapper} ${hasBorder ? styles.bordered : ''}`} {...rest}>
      {icon}
      <div className={styles.title}>{title}</div>
      {subTitle && <div className={styles.subtitle}>{subTitle}</div>}
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
}
