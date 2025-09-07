'use client';
import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import './Info.css';
import News from '@/app/trading/(components)/News/News';
import Analysis from './(components)/Analysis/Analysis';
import PositionsGridItem from '@/components/PositionsGridItem';
import Chart from './(components)/Chart/Chart';

const Info = () => {
  const [activeTab, setActiveTab] = useState<string>('news');

  const items: TabsProps['items'] = [
    {
      key: 'news',
      label: 'News',
      children: <News />,
    },
    {
      key: '2',
      label: 'Analysis',
      children: <Analysis />,
    },
    {
      key: '3',
      label: 'Chart',
      children: <Chart />,
    },
  ];
  return (
    <PositionsGridItem
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
      contentStyle={{ overflowY: 'auto', height: '100%' }}
    />
  );
};

export default Info;
