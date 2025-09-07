'use client';
import Info from './(components)/Info';
import { Col, Row } from 'antd';
import Positions from './(components)/Positions';
import Instruments from './(components)/Instruments';

const Page = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col md={12} key="instruments">
        <Instruments />
      </Col>
      <Col md={12} key="info">
        <Info />
      </Col>
      <Col span={24} key="positions">
        <Positions />
      </Col>
    </Row>
  );
};

export default Page;
