'use client';

import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import './styles.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { equities } from './data';
import WatchList from './WatchList';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Trading = () => {
  const [currentEquity, setCurrentEquity] = useState(equities[0].symbol);
  const defaultLayouts = {
    lg: [
      { i: 'chart', x: 0, y: 0, w: 6, h: 10, minW: 6, maxW: 12 },
      { i: 'news', x: 7, y: 0, w: 6, h: 10, minW: 6, maxW: 12 },
      { i: 'watch-list', x: 4, y: 2, w: 12, h: 10 },
    ],
  };
  return (
    <ResponsiveGridLayout layouts={defaultLayouts} rowHeight={30}>
      <div className="grid-item" key="chart">
        chart
      </div>
      <div className="grid-item" key="news">
        news
      </div>
      <div className="grid-item" key="watch-list">
        <WatchList
          currentEquity={currentEquity}
          setCurrentEquity={setCurrentEquity}
        />
      </div>
    </ResponsiveGridLayout>
  );
};

export default Trading;
