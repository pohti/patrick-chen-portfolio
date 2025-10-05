'use client';
import React from 'react';

import './Info.css';
import News from '@/app/trading/(components)/Info/News/News';
// import Analysis from './Analysis/Analysis';
import Chart from './Chart/Chart';
import Tab, { type TabItem } from '@/components/CustomTab';

const Info = () => {
  const items: TabItem[] = [
    {
      key: 'chart',
      label: 'Chart',
      content: <Chart />,
    },
    {
      key: 'news',
      label: 'News',
      content: <News />,
    },
    // TODO: re-enable analysis tab when prop is fixed
    // {
    //   key: 'analysis',
    //   label: 'Analysis',
    //   content: <Analysis />,
    // },
  ];
  return <Tab tabItems={items} />;
};

export default Info;
