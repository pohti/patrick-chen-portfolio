import React from 'react';
import PositionsGridItem from './(components)/PositionsGridItem';
import StockTable from '@/components/StockTable';

const Instruments = () => {
  return <PositionsGridItem title="Instruments" content={<StockTable />} />;
};

export default Instruments;
