import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const Info = () => {
  const [activeTab, setActiveTab] = useState<string>('1');
  const onChange = (key: string) => {
    console.log(key);
    setActiveTab(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tab 1',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: 'Tab 2',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Tab 3',
      children: 'Content of Tab Pane 3',
    },
  ];
  return (
    <div>
      <div>
        <span>Info</span>
      </div>
      <div>
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
