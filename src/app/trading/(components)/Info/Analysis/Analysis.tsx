import { useEquityStore } from '@/store/equity';
import React from 'react';
import { Chart as PieChart } from 'react-google-charts';
import { analysisData } from './data';

const headers = [['Sentiment', 'No. of Analysts']];

const Analysis = ({ active }: { active: boolean }) => {
  const { currentEquity } = useEquityStore();

  if (!active) return null;

  if (!currentEquity) {
    return (
      <div style={{ minHeight: 320 }}>
        Please select an equity to view analysis.
      </div>
    );
  }

  const currentData = analysisData[currentEquity?.symbol] || [];

  const totalAnalysts = currentData
    .slice(1)
    .reduce((acc, curr) => acc + Number(curr[1]), 0);

  const options = {
    title: `Based on ${totalAnalysts} analysts`,
    titleTextStyle: {
      color: '#d4d4d4',
      fontSize: 18,
    },
    colors: ['#4CAF50', '#2196F3', '#FFC107', '#F44336'],
    backgroundColor: '#1e1e1e',
    legend: {
      textStyle: { color: '#fff', fontSize: 14 },
      position: 'right',
    },
    pieSliceTextStyle: {
      color: '#fff',
    },
  };

  return (
    <div style={{ height: 320, width: '100%' }}>
      <PieChart
        chartType="PieChart"
        data={[...headers, ...currentData]}
        options={options}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default Analysis;
