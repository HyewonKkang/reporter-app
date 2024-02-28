import React, { HTMLAttributes } from 'react';
import styles from './Tabs.module.css';
import useTabs from '@/hooks/useTabs';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  items: Array<TabItem>;
  defaultActiveKey?: TabItem['key'];
  position?: TabPosition;
}

function Tabs({ items, defaultActiveKey, position = 'center', ...rest }: Props) {
  const { activeTabKey, setActiveTab } = useTabs({ items, defaultActiveKey });

  return (
    <div className={styles.tab_wrapper} {...rest}>
      <div
        className={`${styles.tab_list} ${
          position === 'left' ? styles.left : position === 'right' ? styles.right : styles.center
        }`}
      >
        {items.map((item: TabItem) => (
          <div className={styles.tab_item} key={item.key}>
            <button
              className={`${styles.tab_item_button} ${
                activeTabKey === item.key ? styles.active : ''
              }`}
              onClick={() => setActiveTab(item.key)}
            >
              {item.label}
            </button>
          </div>
        ))}
      </div>
      <div>
        {items.map((item: TabItem) => (
          <div
            key={item.key}
            className={`${styles.tab_content_panel} ${
              activeTabKey === item.key ? styles.active : ''
            }`}
          >
            {item.children}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tabs;
