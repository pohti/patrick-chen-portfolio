import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import DragHandle from '@/components/DragHandle';

import './Info.css'; // Assuming you have a CSS file for styling
import News from '@/components/News';

const Info = () => {
  const [activeTab, setActiveTab] = useState<string>('1');
  const onChange = (key: string) => {
    console.log(key);
    setActiveTab(key);
  };

  const items: TabsProps['items'] = [
    {
      key: 'news',
      label: 'News',
      children: <News />,
    },
    {
      key: '2',
      label: 'Analysis',
      children: 'Content of Tab Pane 2',
    },
    // {
    //   key: '3',
    //   label: 'Tab 3',
    //   children: 'Content of Tab Pane 3',
    // },
  ];
  return (
    <div>
      <DragHandle text="Info" />
      <div className="info-content">
        <Tabs
          defaultActiveKey={activeTab}
          activeKey={activeTab}
          items={items}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Info;
