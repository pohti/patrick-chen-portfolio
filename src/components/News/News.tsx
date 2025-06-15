'use client';
import { useEquityStore } from '@/store/equity';
import React from 'react';
import { mockedNews } from './data';

import './News.css';
import NewsCard from './NewsCard';

const News = () => {
  const { currentEquity } = useEquityStore();
  console.log('news: currentEquity', currentEquity);

  if (currentEquity)
    return (
      // show something if no news available
      <div className="news-container">
        {mockedNews
          .filter((news) => news.symbol === currentEquity.symbol)
          .map((newsItem) => (
            <NewsCard key={newsItem.url} {...newsItem} />
          ))}
      </div>
    );
  else return <div>Please select an equity to view news.</div>;
};

export default News;
