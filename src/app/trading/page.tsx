'use client';
// import Info from './(components)/Info';
import { Col, Row } from 'antd';
import Positions from './(components)/Positions';
import Instruments from './(components)/Instruments';
import Info from './(components)/Info';
import Banner from '@/components/Banner';

const Page = () => {
  return (
    <div>
      {/* Demo Information Banner */}
      <Banner>
        <span>
          Stock prices and news are all simulated for demonstration purposes
          only.
        </span>
      </Banner>

      <Row gutter={[16, 16]} style={{ padding: '0.5rem' }}>
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
    </div>
  );
};

export default Page;
