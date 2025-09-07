import React from 'react';
import StockTable from '@/components/StockTable';
import PositionsGridItem from '@/components/PositionsGridItem';

const Positions = () => {
  return <PositionsGridItem title="Watchlist" content={<StockTable />} />;
};

export default Positions;
