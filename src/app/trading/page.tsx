'use client';

import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import './page.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import WatchList from './WatchList';
import Chart from './Chart';
import Info from './Info';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Trading = () => {
  const defaultLayouts = {
    lg: [
      { i: 'chart', x: 0, y: 0, w: 6, h: 10, minW: 6, maxW: 12 },
      { i: 'info', x: 7, y: 0, w: 6, h: 10, minW: 6, maxW: 12 },
      { i: 'watch-list', x: 4, y: 2, w: 12, h: 10, minW: 8 },
    ],
  };
  return (
    // TODO: change the color of the grid while being dragged
    <ResponsiveGridLayout
      layouts={defaultLayouts}
      rowHeight={30}
      draggableHandle=".drag-handle"
    >
      <div className="grid-item" key="chart">
        <Chart />
      </div>
      <div className="grid-item" key="info">
        <Info />
      </div>
      <div className="grid-item" key="watch-list">
        <WatchList />
      </div>
    </ResponsiveGridLayout>
  );
};

export default Trading;
