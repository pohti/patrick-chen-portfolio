'use client';
import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import './Info.css';
import News from '@/app/trading/(components)/Info/News/News';
import Analysis from './Analysis/Analysis';
import GridItem from '@/app/trading/(components)/GridItem';
import Chart from './Chart/Chart';

const Info = () => {
  const [activeTab, setActiveTab] = useState<string>('chart');

  const items: TabsProps['items'] = [
    {
      key: 'chart',
      label: 'Chart',
      children: <Chart />,
    },
    {
      key: 'news',
      label: 'News',
      children: <News />,
    },
    {
      key: 'analysis',
      label: 'Analysis',
      children: <Analysis />,
    },
  ];
  return (
    <GridItem
      title="Info"
      content={
        <Tabs
          defaultActiveKey={activeTab}
          activeKey={activeTab}
          items={items}
          onChange={setActiveTab}
          tabBarStyle={{
            color: 'var(--font-color-white)',
            border: 'red',
          }}
        />
      }
      contentStyle={{ overflowY: 'auto', height: '90%' }}
    />
  );
};

export default Info;
