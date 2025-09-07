import React from 'react';
import GridItem from '../GridItem';
import Table from '@/app/trading/(components)/Instruments/Table';

const Instruments = () => {
  return <GridItem title="Instruments" content={<Table />} />;
};

export default Instruments;
