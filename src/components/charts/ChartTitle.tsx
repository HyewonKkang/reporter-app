import React from 'react';
import styles from './Charts.module.css';

export default function ChartTitle({ children }: { children: string }) {
  return <h2 className={styles.chart_title}>{children}</h2>;
}
