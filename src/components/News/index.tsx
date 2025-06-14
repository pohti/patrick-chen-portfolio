import React from 'react';
import { mockedNews, type NewsData } from './data';

interface Props {
  currentEquity: string;
}

const NewsCard = ({
  title,
  details,
  source,
  url,
  publishedAt,
  sentiment,
}: NewsData) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{details}</p>
      <p>Source: {source}</p>
      <p>Published at: {new Date(publishedAt).toLocaleString()}</p>
      {sentiment && <p>Sentiment: {sentiment}</p>}
      <a href={url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
};

const News = ({ currentEquity }: Props) => {
  return (
    <div>
      <h2>News for {currentEquity}</h2>
      {/* Assuming mockedNews is imported from data.ts */}
      {mockedNews
        .filter((news) => news.symbol === currentEquity)
        .map((newsItem) => (
          <NewsCard key={newsItem.url} {...newsItem} />
        ))}
    </div>
  );
};

export default News;
