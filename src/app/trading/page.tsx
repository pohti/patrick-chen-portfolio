'use client';
import './page.css';
import WatchList from './WatchList';
import Info from './Info';
import Chart from '@/app/trading/Chart';
import { Col, Row } from 'antd';

const Trading = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col md={12} key="chart">
        <Chart />
      </Col>
      <Col md={12} key="info">
        <Info />
      </Col>
      <Col span={24} key="watch-list">
        <WatchList />
      </Col>
    </Row>
  );
};

export default Trading;
