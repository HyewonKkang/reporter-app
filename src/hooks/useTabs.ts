import { useState, useCallback } from 'react';

interface useTabsProps {
  items: Array<TabItem>;
  defaultActiveKey?: TabItem['key'];
}

function useTabs({ items, defaultActiveKey }: useTabsProps) {
  const [activeTabKey, setActiveTabKey] = useState<string>(defaultActiveKey || items[0].key);

  const setActiveTab = useCallback((key: TabItem['key']) => setActiveTabKey(key), [activeTabKey]);

  return { activeTabKey, setActiveTab };
}

export default useTabs;
