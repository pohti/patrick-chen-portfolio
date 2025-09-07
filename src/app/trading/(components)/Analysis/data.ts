export type Sentiment = 'Strong buy' | 'Buy' | 'Hold' | 'Sell';

export type AnalysisEntry = [Sentiment, number];

export type AnalysisData = {
  [symbol: string]: AnalysisEntry[];
};

export const analysisData: AnalysisData = {
  AAPL: [
    ['Strong buy', 10],
    ['Buy', 2],
    ['Hold', 2],
    ['Sell', 8],
  ],
  GOOGL: [
    ['Strong buy', 5],
    ['Buy', 3],
    ['Hold', 4],
    ['Sell', 1],
  ],
  VOO: [
    ['Strong buy', 7],
    ['Buy', 4],
    ['Hold', 3],
    ['Sell', 2],
  ],
  QQQ: [
    ['Strong buy', 6],
    ['Buy', 5],
    ['Hold', 2],
    ['Sell', 3],
  ],
  SPX: [
    ['Strong buy', 8],
    ['Buy', 3],
    ['Hold', 4],
    ['Sell', 1],
  ],
  IXIC: [
    ['Strong buy', 9],
    ['Buy', 2],
    ['Hold', 3],
    ['Sell', 2],
  ],
  VNQ: [
    ['Strong buy', 4],
    ['Buy', 3],
    ['Hold', 5],
    ['Sell', 1],
  ],
  SCHH: [
    ['Strong buy', 3],
    ['Buy', 4],
    ['Hold', 2],
    ['Sell', 1],
  ],
  VFIAX: [
    ['Strong buy', 6],
    ['Buy', 5],
    ['Hold', 3],
    ['Sell', 2],
  ],
  FXAIX: [
    ['Strong buy', 7],
    ['Buy', 4],
    ['Hold', 2],
    ['Sell', 1],
  ],
};
