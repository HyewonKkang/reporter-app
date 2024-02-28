import React from 'react';
import styles from './Charts.module.css';
import ChartTitle from './ChartTitle';

export default function ChartWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <ChartTitle>{title}</ChartTitle>
      <div className={styles.chart_wrapper}>{children}</div>
    </section>
  );
}
