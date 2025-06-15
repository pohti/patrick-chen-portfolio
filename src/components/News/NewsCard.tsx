'use client';

import { Tag } from 'antd';
import { type NewsData } from './data';

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
          <div className="d-flex justify-end align-center">
            <span>Sentiment: </span>
            <Tag
              color={
                sentiment === 'positive'
                  ? 'green'
                  : sentiment === 'negative'
                    ? 'red'
                    : 'blue'
              }
            >
              {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
            </Tag>
          </div>
        )}
      </div>
      <p>{details}</p>
      <p>Source: {source}</p>
      <p>Published at: {new Date(publishedAt).toISOString()}</p>

      <a href={'#'} rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
};

export default NewsCard;
