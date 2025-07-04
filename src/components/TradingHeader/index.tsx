import React from 'react';
import './styles.css';

interface Props {
  text: string;
}

const TradingHeader = ({ text }: Props) => {
  return (
    <div
      className={`drag-handle d-flex align-items-center justify-content-start`}
    >
      <span>{text}</span>
    </div>
  );
};

export default TradingHeader;
