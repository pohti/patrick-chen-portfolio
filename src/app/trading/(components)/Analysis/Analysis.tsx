import { useEquityStore } from '@/store/equity';
import React from 'react';
import { Chart as PieChart } from 'react-google-charts';
import { analysisData } from './data';

const headers = [['Sentiment', 'No. of Analysts']];

const Analysis = () => {
  const { currentEquity } = useEquityStore();

  if (!currentEquity) {
    return <div>Please select an equity to view analysis.</div>;
  }

  const currentData = analysisData[currentEquity?.symbol] || [];

  const totalAnalysts = currentData
    .slice(1)
    .reduce((acc, curr) => acc + Number(curr[1]), 0);

  const options = {
    title: `Based on ${totalAnalysts} analysts`,
    // height: 300,
    colors: ['#4CAF50', '#2196F3', '#FFC107', '#F44336'],
  };

  return (
    <PieChart
      chartType="PieChart"
      data={[...headers, ...currentData]}
      options={options}
      width="100%"
      height="100%"
      style={{ minHeight: '18rem' }}
    />
  );
};

export default Analysis;
