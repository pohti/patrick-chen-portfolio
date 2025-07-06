'use client';
import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import TradingHeader from '@/components/TradingHeader';

import './Info.css';
import News from '@/app/trading/(components)/News/News';
import Analysis from './(components)/Analysis/Analysis';

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
  ];
  return (
    <div className="trading-grid-item">
      <TradingHeader text="Info" />
      <div className="info-content">
        <Tabs
          defaultActiveKey={activeTab}
          activeKey={activeTab}
          items={items}
          onChange={setActiveTab}
        />
      </div>
    </div>
  );
};

export default Info;
