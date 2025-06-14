'use client';
import { useEquityStore } from '@/store/equity';
import React from 'react';
import { mockedNews, type NewsData } from './data';

import './News.css';

const NewsCard = ({
  title,
  details,
  source,
  publishedAt,
  sentiment,
}: NewsData) => {
  return (
    <div className="news-card">
      <div className="news-card-header-row">
        <span>{title}</span>
        {sentiment && (
          <p>
            Sentiment:{' '}
            <span className={`sentiment-${sentiment}`}>{sentiment}</span>
          </p>
        )}
      </div>
      <p>{details}</p>
      <p>Source: {source}</p>
      <p>Published at: {new Date(publishedAt).toLocaleString()}</p>

      <a href={'#'} rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
};

const News = () => {
  const { currentEquity } = useEquityStore();

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
