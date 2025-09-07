export interface Position {
  symbol: string; // e.g. "AAPL"
  quantity: number; // e.g. 50
  averagePrice: number; // e.g. 150.00
  currentPrice: number; // e.g. 155.00
  marketValue: number; // e.g. 7750.00 (quantity * currentPrice)
  unrealizedPL: number; // e.g. 250.00 (marketValue - (quantity * averagePrice))
  unrealizedPLPercent: number; // e.g. 3.33 (%)
  lastUpdated: string; // ISO date string
}

export const mockedPositions: Position[] = [
  {
    symbol: 'AAPL',
    quantity: 50,
    averagePrice: 150.0,
    currentPrice: 155.0,
    marketValue: 7750.0,
    unrealizedPL: 250.0,
    unrealizedPLPercent: 3.33,
    lastUpdated: '2025-06-08T14:00:00Z',
  },
  {
    symbol: 'GOOGL',
    quantity: 20,
    averagePrice: 135.0,
    currentPrice: 138.0,
    marketValue: 2760.0,
    unrealizedPL: 60.0,
    unrealizedPLPercent: 2.22,
    lastUpdated: '2025-06-08T14:00:00Z',
  },
  {
    symbol: 'VOO',
    quantity: 10,
    averagePrice: 400.0,
    currentPrice: 405.0,
    marketValue: 4050.0,
    unrealizedPL: 50.0,
    unrealizedPLPercent: 1.25,
    lastUpdated: '2025-06-08T14:00:00Z',
  },
];
