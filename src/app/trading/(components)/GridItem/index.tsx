import React, { ReactNode } from 'react';
import styles from './GridItem.module.css';

interface Props {
  title: ReactNode;
  content: ReactNode;
  contentStyle?: React.CSSProperties;
  ref?: React.RefObject<HTMLDivElement> | null;
}

const PositionsGridItem = ({ title, content, contentStyle, ref }: Props) => {
  return (
    <div className={styles.tradingGridItem} ref={ref}>
      <div
        className={`${styles.gridItemHeader} d-flex align-items-center justify-content-start`}
      >
        {title}
      </div>
      <div style={{ padding: '5px', ...(contentStyle || {}) }}>{content}</div>
    </div>
  );
};

export default PositionsGridItem;
