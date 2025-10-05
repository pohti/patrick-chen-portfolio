import React, { useState } from 'react';
import GridItem from '../../app/trading/(components)/GridItem';
import styles from './CustomTab.module.css';

export interface TabItem {
  key: string;
  label: string;
  content: React.ReactNode;
}

interface Props {
  tabItems: TabItem[];
}

const Tab = ({ tabItems }: Props) => {
  const [selectedTab, setSelectedTab] = useState(tabItems[0]); // Default to first tab

  const TabButtons = () =>
    tabItems.map((item, index) => (
      <button
        key={index}
        className={item === selectedTab ? styles.selectedTabBtn : styles.tabBtn}
        style={{ marginRight: '8px', cursor: 'pointer' }}
        onClick={() => setSelectedTab(item)}
      >
        {item.label}
      </button>
    ));

  return <GridItem title={<TabButtons />} content={selectedTab.content} />;
};

export default Tab;
