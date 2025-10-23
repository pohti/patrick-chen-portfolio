'use client';
import { useEquityStore } from '@/store/equity';
import React from 'react';
import { mockedNews } from './data';

import NewsCard from './NewsCard';

const News = () => {
  const { currentEquity } = useEquityStore();

  const currentNews = mockedNews.filter(
    (news) => news.symbol === currentEquity?.symbol
  );

  return (
    // show something if no news available
    <div>
      {currentNews.length > 0 ? (
        currentNews.map((newsItem) => (
          <NewsCard key={newsItem.url} {...newsItem} />
        ))
      ) : (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <span>No news for {currentEquity?.symbol}</span>
        </div>
      )}
    </div>
  );
};

export default News;
