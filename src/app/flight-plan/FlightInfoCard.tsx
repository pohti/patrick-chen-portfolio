import React from 'react';
import { Col, Row } from 'antd';

interface DataItem {
  label: string;
  value: string | number;
}

interface Props {
  title: string;
  data: DataItem[];
}

const FlightInfoCard = ({ title, data }: Props) => {
  return (
    <div
      style={{
        padding: '15px',
        borderRadius: '12px',
        border: '1px solid #d4d4d42a',
      }}
    >
      <span
        style={{
          fontWeight: 'bold',
          fontSize: '1.15rem',
          color: 'var(--font-color-primary)',
        }}
      >
        {title}
      </span>
      <hr style={{ borderColor: '#d4d4d42a' }} />
      <Row gutter={[16, 28]} style={{ marginTop: '15px' }}>
        {data.map((item, index) => (
          <Col className="gutter-row" span={4} key={index}>
            <div
              className="d-flex flex-column mb-2"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  color: '#d4d4d487',
                }}
              >
                {item.label}
              </div>
              <div>
                <b>{item.value}</b>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FlightInfoCard;
