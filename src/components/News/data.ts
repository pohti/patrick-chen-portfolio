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
  // AAPL
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
    symbol: 'AAPL',
    title: 'Apple Faces Supply Chain Challenges in Asia',
    details:
      'Apple is reportedly facing delays due to supply chain issues in several Asian countries.',
    source: 'Bloomberg',
    url: 'https://www.bloomberg.com/news/apple-supply-chain',
    publishedAt: '2025-06-09T09:00:00Z',
    sentiment: 'negative',
  },
  {
    symbol: 'AAPL',
    title: 'Apple Expands Services Business in Europe',
    details:
      'Apple has announced the expansion of its services business in key European markets.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/apple-services-europe',
    publishedAt: '2025-06-10T08:30:00Z',
    sentiment: 'positive',
  },

  // GOOGL
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
    symbol: 'GOOGL',
    title: 'Google Fined by EU for Antitrust Violations',
    details:
      'The European Union has fined Google over antitrust violations related to its ad business.',
    source: 'Reuters',
    url: 'https://www.reuters.com/article/google-eu-fine',
    publishedAt: '2025-06-09T13:45:00Z',
    sentiment: 'negative',
  },
  {
    symbol: 'GOOGL',
    title: 'Alphabet Invests in Green Data Centers',
    details:
      'Alphabet is investing heavily in sustainable data center infrastructure worldwide.',
    source: 'TechCrunch',
    url: 'https://techcrunch.com/news/alphabet-green-data-centers',
    publishedAt: '2025-06-10T10:20:00Z',
    sentiment: 'positive',
  },

  // QQQ
  {
    symbol: 'QQQ',
    title: 'Invesco QQQ Trust Hits New 52-Week High',
    details:
      'Invesco QQQ Trust reached a new 52-week high as tech stocks led the market rally.',
    source: 'Yahoo Finance',
    url: 'https://finance.yahoo.com/news/invesco-qqq-52-week-high',
    publishedAt: '2025-06-08T13:00:00Z',
    sentiment: 'positive',
  },
  {
    symbol: 'QQQ',
    title: 'QQQ Sees Record Inflows Amid Market Optimism',
    details: 'Investors are pouring money into QQQ as market confidence rises.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/news/qqq-record-inflows',
    publishedAt: '2025-06-09T15:10:00Z',
    sentiment: 'positive',
  },
  {
    symbol: 'QQQ',
    title: 'Analysts Warn of Overbought Tech Sector',
    details:
      'Despite QQQ’s recent gains, some analysts caution that the tech sector may be overbought.',
    source: 'MarketWatch',
    url: 'https://www.marketwatch.com/story/qqq-overbought-warning',
    publishedAt: '2025-06-10T16:25:00Z',
    sentiment: 'neutral',
  },

  // VOO
  {
    symbol: 'VOO',
    title: 'Vanguard S&P 500 ETF Sees Increased Investor Interest',
    details:
      'The Vanguard S&P 500 ETF has seen a surge in investor interest as markets continue to rally.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/vanguard-etf-investor-interest',
    publishedAt: '2025-06-08T12:15:00Z',
  },
  {
    symbol: 'VOO',
    title: 'VOO Hits All-Time High',
    details:
      'The Vanguard S&P 500 ETF has hit a new all-time high amid broad market strength.',
    source: 'Bloomberg',
    url: 'https://www.bloomberg.com/news/voo-all-time-high',
    publishedAt: '2025-06-09T09:45:00Z',
    sentiment: 'positive',
  },
  {
    symbol: 'VOO',
    title: 'Market Volatility Expected to Test VOO’s Momentum',
    details:
      'Analysts expect short-term volatility which could impact the ETF’s upward trend.',
    source: 'Yahoo Finance',
    url: 'https://finance.yahoo.com/news/voo-market-volatility',
    publishedAt: '2025-06-10T11:10:00Z',
    sentiment: 'neutral',
  },
];
