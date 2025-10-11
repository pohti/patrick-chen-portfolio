import React, { useState } from 'react';
import { CaretUpOutlined } from '@ant-design/icons';

const MapLegend = () => {
  const [legendClosed, setLegendClosed] = useState(false);

  if (legendClosed) {
    return (
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
          padding: '8px 12px',
          zIndex: 1000,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: '12px',
          background: 'rgba(255,255,255)',
          cursor: 'pointer',
          color: '#333',
          height: '30px',
          width: '90px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onClick={() => setLegendClosed(false)}
      >
        <span>Legend</span>
        <CaretUpOutlined />
      </div>
    );
  } else
    return (
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
          padding: '12px',
          zIndex: 1000,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: '12px',
          minWidth: '140px',
          background: 'rgba(255,255,255,0.85)',
          color: '#333',
        }}
        onClick={() => setLegendClosed(true)}
      >
        <div
          style={{
            fontWeight: 'bold',
            marginBottom: '8px',
            textAlign: 'center',
          }}
        >
          Temperature (°C)
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#EF4444',
                borderRadius: '3px',
              }}
            />
            <span>30°+ Hot</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#F59E0B',
                borderRadius: '3px',
              }}
            />
            <span>25° - 30° Warm</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#c4e025ff',
                borderRadius: '3px',
              }}
            />
            <span>20° - 25° Mild</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#10B981',
                borderRadius: '3px',
              }}
            />
            <span>10° - 20° Cool</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#3bf6e0ff',
                borderRadius: '3px',
              }}
            />
            <span>0° - 10° Cold</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#287aedff',
                borderRadius: '3px',
              }}
            />
            <span>&lt; 0° Freezing</span>
          </div>
        </div>
      </div>
    );
};

export default MapLegend;
