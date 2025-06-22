'use client';
import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import DragHandle from '@/components/DragHandle';

import './Info.css'; // Assuming you have a CSS file for styling
import News from '@/components/News/News';

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
      children: 'Work in progress...',
    },
  ];
  return (
    <div>
      <DragHandle text="Info" />
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
