import React, { ReactNode } from 'react';
import TradingHeader from '../TradingHeader';

interface Props {
  title: string;
  content: ReactNode;
  contentStyle?: React.CSSProperties;
  ref?: React.RefObject<HTMLDivElement> | null;
}

const PositionsGridItem = ({ title, content, contentStyle, ref }: Props) => {
  return (
    <div className="trading-grid-item" ref={ref}>
      <TradingHeader text={title} />
      <div style={{ padding: '5px', ...(contentStyle || {}) }}>{content}</div>
    </div>
  );
};

export default PositionsGridItem;
