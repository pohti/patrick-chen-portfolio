'use client';
import './page.css';
import Info from './Info';
import { Col, Row } from 'antd';
import Positions from './Positions';

const Page = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col md={12} key="stocks-table">
        <div>Stocks Table...</div>
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
