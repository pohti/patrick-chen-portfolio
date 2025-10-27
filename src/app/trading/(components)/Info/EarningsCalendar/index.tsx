'use client';
import React, { useEffect, useState } from 'react';
import { useEquityStore } from '@/store/equity';
import { getEarningsCalendar, type EarningEvent } from '@/lib/finnhub/finnhub';
import { Row, Col } from 'antd';
import { formatRevenue } from '@/utils/formatNumber';

const EarningsCalendar = () => {
  const { currentEquity } = useEquityStore();
  const [loading, setLoading] = useState(false);
  const [earningsEvents, setEarningsEvents] = useState<EarningEvent[]>([]);

  useEffect(() => {
    const fetchEarningsCalendar = async (symbol: string) => {
      const earnings = await getEarningsCalendar(symbol);
      setEarningsEvents(earnings);
      setLoading(false);
    };

    if (currentEquity?.symbol) {
      setLoading(true);
      fetchEarningsCalendar(currentEquity?.symbol);
    }
  }, [currentEquity]);

  if (loading) {
    return <div>Loading earnings calendar...</div>;
  }

  return (
    <div style={{ padding: '0.5rem' }}>
      <span style={{ fontSize: '1.1rem' }}>
        Earnings calendar for {currentEquity?.symbol} in 2025
      </span>
      <div style={{ marginTop: '0.5rem' }}>
        {earningsEvents.map(
          ({
            date,
            epsActual,
            epsEstimate,
            revenueActual,
            revenueEstimate,
          }) => (
            // TODO: grey out past dates
            // TODO: better styling
            <div
              key={date}
              style={{
                border: '1px solid var(--border)',
                borderRadius: '5px',
                padding: '10px 5px',
              }}
            >
              <Row justify="space-between">
                <Col span={6}>
                  <strong>{date}</strong>
                </Col>
              </Row>

              <Row style={{ marginTop: '0.5rem' }} gutter={16}>
                <Col span={6}>
                  <Row style={{ color: 'var(--font-color-primary' }}>
                    <b>EPS Actual</b>
                  </Row>
                  <Row>{epsActual || 'N/A'}</Row>
                </Col>
                <Col span={6}>
                  <Row style={{ color: 'var(--font-color-primary' }}>
                    <b>EPS Estimate</b>
                  </Row>
                  <Row>{epsEstimate || 'N/A'}</Row>
                </Col>
                <Col span={6}>
                  <Row style={{ color: 'var(--font-color-primary' }}>
                    <b>Revenue Actual</b>
                  </Row>
                  <Row>{formatRevenue(revenueActual)}</Row>
                </Col>
                <Col span={6}>
                  <Row style={{ color: 'var(--font-color-primary' }}>
                    <b>Revenue Estimate</b>
                  </Row>
                  <Row>{formatRevenue(revenueEstimate)}</Row>
                </Col>
              </Row>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default EarningsCalendar;
