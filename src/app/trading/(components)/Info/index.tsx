'use client';
import React from 'react';

import './Info.css';
import News from '@/app/trading/(components)/Info/News/News';
import Analysis from './Analysis/Analysis';
import Chart from './Chart/Chart';
import Tab, { type TabItem } from '../CustomTab';
import EarningsCalendar from './EarningsCalendar';

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
    {
      key: 'analysis',
      label: 'Analysis',
      content: <Analysis />,
    },
    {
      key: 'earnings-calendar',
      label: 'Earnings Calendar',
      content: <EarningsCalendar />,
    },
  ];
  return <Tab tabItems={items} />;
};

export default Info;
