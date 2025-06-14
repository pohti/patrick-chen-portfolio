export interface NewsData {
  symbol: string;
  title: string;
  details: string;
  source: string; // e.g., "Reuters", "Bloomberg"
  url: string; // Link to the full article
  publishedAt: string; // ISO date string
  sentiment?: 'positive' | 'neutral' | 'negative'; // Optional sentiment analysis
}

export const mockedNews: NewsData[] = [
  {
    symbol: 'AAPL',
    title: 'Apple Inc. Announces New Product Launch',
    details:
      'Apple Inc. has announced the launch of its latest product, which is expected to revolutionize the tech industry.',
    source: 'Reuters',
    url: 'https://www.reuters.com/article/apple-product-launch',
    publishedAt: '2025-06-08T10:00:00Z',
    sentiment: 'positive',
  },
  {
    symbol: 'GOOGL',
    title: 'Alphabet Inc. Reports Strong Q2 Earnings',
    details:
      "Alphabet Inc. has reported strong earnings for the second quarter, exceeding analysts' expectations.",
    source: 'Bloomberg',
    url: 'https://www.bloomberg.com/news/alphabet-q2-earnings',
    publishedAt: '2025-06-08T11:30:00Z',
    sentiment: 'positive',
  },
  {
    symbol: 'VOO',
    title: 'Vanguard S&P 500 ETF Sees Increased Investor Interest',
    details:
      'The Vanguard S&P 500 ETF has seen a surge in investor interest as markets continue to rally.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/vanguard-etf-investor-interest',
    publishedAt: '2025-06-08T12:15:00Z',
  },
];
