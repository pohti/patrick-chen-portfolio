'use client';
import { Responsive, WidthProvider } from 'react-grid-layout';
import './page.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import WatchList from './WatchList';
import DragHandle from '@/components/DragHandle';
import Info from './Info';
import { Input } from 'antd';
import Chart from '@/components/Chart/Chart';

const { Search } = Input;
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
    <div>
      <div className="trading-header">
        {/* // TODO: implement search logic */}
        <Search placeholder="Search equities.." style={{ width: '20rem' }} />
      </div>
      <ResponsiveGridLayout
        layouts={defaultLayouts}
        rowHeight={30}
        draggableHandle=".drag-handle"
        isResizable={false}
      >
        <div className="grid-item" key="chart">
          <div>
            <DragHandle text="Chart" />
            <Chart height={355} width={675} />
          </div>
        </div>
        <div className="grid-item" key="info">
          <Info />
        </div>
        <div className="grid-item" key="watch-list">
          <WatchList />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default Trading;
