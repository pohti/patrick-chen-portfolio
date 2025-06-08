import React from 'react';

interface Props {
  currentEquity: string;
  setCurrentEquity: (equity: string) => void;
}

const WatchList = ({ currentEquity, setCurrentEquity }: Props) => {
  return <div>WatchList</div>;
};

export default WatchList;
