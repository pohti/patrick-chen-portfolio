'use client';
import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import './Info.css';
import News from '@/app/trading/(components)/News/News';
import Analysis from './(components)/Analysis/Analysis';
import PositionsGridItem from '@/app/trading/(components)/PositionsGridItem';
import Chart from './(components)/Chart/Chart';

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
