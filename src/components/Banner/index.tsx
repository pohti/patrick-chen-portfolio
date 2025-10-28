import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Banner: React.FC<Props> = ({ children }) => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #e3af4eff 0%, #e9a83fff 100%)',
        color: 'var(--font-color-secondary',
        padding: '5px',
        fontSize: '0.85rem',
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
