import React from 'react';
import GridItem from '@/app/trading/(components)/GridItem';
import Table from './Table';

const Positions = () => {
  return <GridItem title="Positions" content={<Table />} />;
};

export default Positions;
