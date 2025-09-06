'use client';
import './page.css';
import Info from './Info';
import Chart from '@/app/positions/Chart';
import { Col, Row } from 'antd';
import Positions from './Positions';

const Page = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col md={12} key="chart">
        <Chart />
      </Col>
      <Col md={12} key="info">
        <Info />
      </Col>
      <Col span={24} key="watch-list">
        <Positions />
      </Col>
    </Row>
  );
};

export default Page;
