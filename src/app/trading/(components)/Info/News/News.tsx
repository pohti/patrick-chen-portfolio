'use client';
import { useEquityStore } from '@/store/equity';
import React from 'react';
import { mockedNews } from './data';
import { Empty } from 'antd';

import './News.css';
import NewsCard from './NewsCard';

const News = () => {
  const { currentEquity } = useEquityStore();

  const currentNews = mockedNews.filter(
    (news) => news.symbol === currentEquity?.symbol
  );

  return (
    // show something if no news available
    <div className="news-container">
      {currentNews.length > 0 ? (
        currentNews.map((newsItem) => (
          <NewsCard key={newsItem.url} {...newsItem} />
        ))
      ) : (
        <Empty description={`No news for ${currentEquity?.symbol}`} />
      )}
    </div>
  );
};

export default News;
