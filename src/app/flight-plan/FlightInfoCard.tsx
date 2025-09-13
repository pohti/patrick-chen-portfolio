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
      <Row gutter={[16, 18]} style={{ marginTop: '15px' }}>
        {data.map((item, index) => (
          <Col key={index} xs={12} sm={8} md={6} lg={6} xl={4}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left',
                gap: '6px',
                minHeight: '68px',
              }}
            >
              <div
                style={{
                  color: '#d4d4d487',
                  fontSize: '0.65rem',
                  letterSpacing: '0.6px',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontWeight: 600,
                  wordBreak: 'break-word',
                  fontSize: '0.9rem',
                  lineHeight: 1.2,
                }}
              >
                {item.value || '—'}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FlightInfoCard;
