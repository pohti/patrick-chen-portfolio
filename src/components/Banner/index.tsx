import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Banner: React.FC<Props> = ({ children }) => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #a28d47ff 0%, #bc8d41ff 100%)',
        color: 'white',
        padding: '12px 16px',
        fontSize: '14px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '16px' }}>ℹ️</span>
        <span>{children}</span>
      </div>
    </div>
  );
};

export default Banner;
