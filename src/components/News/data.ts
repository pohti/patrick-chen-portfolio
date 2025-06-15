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
  {
    symbol: 'SPX',
    title: 'S&P 500 Hits All-Time High on Tech Rally',
    details:
      'Led by strong earnings from major tech companies, the S&P 500 closed at a record high today.',
    source: 'Reuters',
    url: 'https://www.reuters.com/markets/sp500-tech-rally',
    publishedAt: '2025-06-12T14:45:00Z',
    sentiment: 'positive',
  },
  {
    symbol: 'SPX',
    title: 'Economic Data Dampens Market Sentiment',
    details:
      'Weaker-than-expected jobs numbers led to a dip in the S&P 500 as investors reassess growth outlook.',
    source: 'Bloomberg',
    url: 'https://www.bloomberg.com/news/spx-jobs-data',
    publishedAt: '2025-06-11T13:20:00Z',
    sentiment: 'negative',
  },
  {
    symbol: 'SPX',
    title: 'S&P 500 Holds Steady Ahead of Fed Decision',
    details:
      'Investors await the Federal Reserve’s upcoming policy announcement, keeping markets relatively flat.',
    source: 'Wall Street Journal',
    url: 'https://www.wsj.com/market/spx-fed-preview',
    publishedAt: '2025-06-10T10:00:00Z',
    sentiment: 'neutral',
  },
  {
    symbol: 'SPX',
    title: 'Energy Sector Weighs Down S&P 500',
    details:
      'Falling oil prices dragged energy stocks lower, pulling down the broader S&P 500 index.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/spx-energy-slide',
    publishedAt: '2025-06-09T16:30:00Z',
    sentiment: 'negative',
  },
  {
    symbol: 'SPX',
    title: 'Consumer Confidence Boosts S&P 500',
    details:
      'An unexpected jump in consumer sentiment pushed the index higher during afternoon trading.',
    source: 'MarketWatch',
    url: 'https://www.marketwatch.com/story/spx-consumer-confidence',
    publishedAt: '2025-06-08T18:00:00Z',
    sentiment: 'positive',
  },
  {
    symbol: 'SPX',
    title: 'S&P 500 Gains Despite Geopolitical Tensions',
    details:
      'Markets shrugged off global uncertainties as the S&P 500 posted modest gains.',
    source: 'Yahoo Finance',
    url: 'https://finance.yahoo.com/news/spx-resilient-markets',
    publishedAt: '2025-06-07T15:10:00Z',
    sentiment: 'neutral',
  },
  {
    symbol: 'SPX',
    title: 'Healthcare Stocks Drive S&P 500 Higher',
    details:
      'Strong earnings from healthcare companies pushed the index into positive territory.',
    source: 'Bloomberg',
    url: 'https://www.bloomberg.com/news/spx-healthcare-boost',
    publishedAt: '2025-06-06T09:50:00Z',
    sentiment: 'positive',
  },
  {
    symbol: 'SPX',
    title: 'Analysts Predict Volatility for S&P 500',
    details:
      'With inflation concerns persisting, analysts expect choppy trading in the near term.',
    source: 'Barron’s',
    url: 'https://www.barrons.com/articles/spx-volatility-ahead',
    publishedAt: '2025-06-05T12:00:00Z',
    sentiment: 'neutral',
  },
  {
    symbol: 'SPX',
    title: 'S&P 500 Dips After Mixed Earnings Reports',
    details:
      'Mixed quarterly results from major firms caused the index to slip slightly.',
    source: 'Reuters',
    url: 'https://www.reuters.com/markets/spx-earnings-dip',
    publishedAt: '2025-06-04T17:00:00Z',
    sentiment: 'negative',
  },
  {
    symbol: 'SPX',
    title: 'Tech and Finance Lift S&P 500',
    details:
      'Strong showings from tech and financial sectors led the index to a third straight day of gains.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/spx-tech-finance-rally',
    publishedAt: '2025-06-03T14:30:00Z',
    sentiment: 'positive',
  },
  {
    symbol: 'IXIC',
    title: 'Nasdaq Surges on AI Stock Momentum',
    details:
      'AI-related companies led the Nasdaq to strong gains, with chipmakers and software firms topping the charts.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/nasdaq-ai-rally',
    publishedAt: '2025-06-12T15:45:00Z',
    sentiment: 'positive',
  },
  {
    symbol: 'IXIC',
    title: 'Tech Stocks Slide Amid Valuation Concerns',
    details:
      'High valuations triggered a sell-off in tech shares, dragging down the Nasdaq Composite by over 1.5%.',
    source: 'Bloomberg',
    url: 'https://www.bloomberg.com/news/nasdaq-tech-selloff',
    publishedAt: '2025-06-11T14:15:00Z',
    sentiment: 'negative',
  },
  {
    symbol: 'IXIC',
    title: 'Nasdaq Holds Ground as Investors Await CPI Data',
    details:
      'The index showed little movement as traders braced for key inflation figures later this week.',
    source: 'Reuters',
    url: 'https://www.reuters.com/markets/nasdaq-flat-cpi-ahead',
    publishedAt: '2025-06-10T11:30:00Z',
    sentiment: 'neutral',
  },
  {
    symbol: 'VNQ',
    title: 'VNQ Rises as Real Estate Sector Shows Signs of Recovery',
    details:
      'Real estate ETFs like VNQ gained as commercial property markets stabilized in key U.S. cities.',
    source: 'Bloomberg',
    url: 'https://www.bloomberg.com/news/vnq-recovery-trends',
    publishedAt: '2025-06-12T13:30:00Z',
    sentiment: 'positive',
  },
  {
    symbol: 'VNQ',
    title: 'Interest Rate Jitters Weigh on VNQ',
    details:
      'VNQ dipped as investors grew concerned over the Fed potentially delaying rate cuts.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/vnq-interest-rate-fears',
    publishedAt: '2025-06-11T14:00:00Z',
    sentiment: 'negative',
  },
  {
    symbol: 'VNQ',
    title: 'VNQ Flat Despite Mixed Housing Data',
    details:
      'A mix of strong homebuilder earnings and weak multifamily starts left VNQ unchanged on the day.',
    source: 'Reuters',
    url: 'https://www.reuters.com/markets/vnq-housing-data-mixed',
    publishedAt: '2025-06-10T10:45:00Z',
    sentiment: 'neutral',
  },
  {
    symbol: 'VNQ',
    title: 'Office REITs Pressure VNQ Lower',
    details:
      'Persistent weakness in the office space market continues to drag down VNQ performance.',
    source: 'MarketWatch',
    url: 'https://www.marketwatch.com/story/vnq-office-reits-downturn',
    publishedAt: '2025-06-09T16:10:00Z',
    sentiment: 'negative',
  },
  {
    symbol: 'SCHH',
    title: 'SCHH Climbs on Strong REIT Earnings',
    details:
      'Positive earnings surprises from top REIT holdings helped lift SCHH in today’s session.',
    source: 'Bloomberg',
    url: 'https://www.bloomberg.com/news/schh-reit-earnings-beat',
    publishedAt: '2025-06-12T13:10:00Z',
    sentiment: 'positive',
  },
  {
    symbol: 'SCHH',
    title: 'Rising Yields Drag SCHH Lower',
    details:
      'Treasury yield increases led to a broad sell-off in rate-sensitive REITs, pulling SCHH down.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/news/schh-yields-weigh-reits',
    publishedAt: '2025-06-11T15:00:00Z',
    sentiment: 'negative',
  },
  {
    symbol: 'SCHH',
    title: 'SCHH Flat as Market Awaits Inflation Data',
    details:
      'The real estate ETF remained unchanged with traders in wait-and-see mode ahead of CPI data.',
    source: 'Reuters',
    url: 'https://www.reuters.com/markets/schh-waiting-on-cpi',
    publishedAt: '2025-06-10T10:30:00Z',
    sentiment: 'neutral',
  },
  {
    symbol: 'SCHH',
    title: 'Commercial REIT Optimism Lifts SCHH',
    details:
      'Renewed optimism in the commercial real estate sector boosted SCHH by over 1%.',
    source: 'MarketWatch',
    url: 'https://www.marketwatch.com/story/schh-commercial-reit-boost',
    publishedAt: '2025-06-09T14:45:00Z',
    sentiment: 'positive',
  },
  {
    symbol: 'SCHH',
    title: 'SCHH Drops After Fed Signals Higher for Longer',
    details:
      'REIT ETFs like SCHH fell after the Federal Reserve suggested interest rates may stay elevated.',
    source: 'Yahoo Finance',
    url: 'https://finance.yahoo.com/news/schh-fed-policy-impact',
    publishedAt: '2025-06-08T12:00:00Z',
    sentiment: 'negative',
  },
];
