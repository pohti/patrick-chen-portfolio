'use client';

import { create } from 'zustand';

export enum EquityType {
  Stock = 'stock',
  ETF = 'etf',
  IndexFund = 'index_fund',
  REIT = 'reit',
  MutualFund = 'mutual_fund',
}

export interface Equity {
  symbol: string; // e.g., "AAPL"
  name: string; // e.g., "Apple Inc."
  type: EquityType; // e.g., "stock"
  market: string; // e.g., "NASDAQ", "NYSE"
  currency: string; // e.g., "USD"
  price: number; // Current price
  change: number; // Price change (e.g., +1.23)
  changePercent: number; // Percentage change (e.g., 0.56)
  volume: number; // Daily traded volume
  marketCap: number; // Market capitalization
  peRatio?: number; // Optional for ETFs/Index Funds
  dividendYield?: number; // Optional
  lastUpdated: string; // ISO date string
}

type EquityStore = {
  equityList: Equity[];
  currentEquity?: Equity;
  setCurrentEquity: (symbol: string) => void;
};

export const mockedEquities: Equity[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: EquityType.Stock,
    market: 'NASDAQ',
    currency: 'USD',
    price: 195.45,
    change: 1.13,
    changePercent: 0.58,
    volume: 80000000,
    marketCap: 3000000000000,
    peRatio: 31.2,
    dividendYield: 0.55,
    lastUpdated: '2025-06-08T14:00:00Z',
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    type: EquityType.Stock,
    market: 'NASDAQ',
    currency: 'USD',
    price: 138.23,
    change: -0.87,
    changePercent: -0.63,
    volume: 28000000,
    marketCap: 1800000000000,
    peRatio: 27.1,
    dividendYield: 0,
    lastUpdated: '2025-06-08T14:00:00Z',
  },
  {
    symbol: 'VOO',
    name: 'Vanguard S&P 500 ETF',
    type: EquityType.ETF,
    market: 'NYSE',
    currency: 'USD',
    price: 420.75,
    change: -1.23,
    changePercent: -0.29,
    volume: 5000000,
    marketCap: 350000000000,
    dividendYield: 1.35,
    lastUpdated: '2025-06-08T14:00:00Z',
  },
  {
    symbol: 'QQQ',
    name: 'Invesco QQQ Trust',
    type: EquityType.ETF,
    market: 'NASDAQ',
    currency: 'USD',
    price: 375.88,
    change: 2.12,
    changePercent: 0.57,
    volume: 6500000,
    marketCap: 220000000000,
    dividendYield: 0.78,
    lastUpdated: '2025-06-08T14:00:00Z',
  },
  {
    symbol: 'SPX',
    name: 'S&P 500 Index',
    type: EquityType.IndexFund,
    market: 'NYSE',
    currency: 'USD',
    price: 5300.55,
    change: 15.44,
    changePercent: 0.29,
    volume: 0,
    marketCap: 0,
    lastUpdated: '2025-06-08T14:00:00Z',
  },
  {
    symbol: 'IXIC',
    name: 'NASDAQ Composite Index',
    type: EquityType.IndexFund,
    market: 'NASDAQ',
    currency: 'USD',
    price: 16820.12,
    change: 65.77,
    changePercent: 0.39,
    volume: 0,
    marketCap: 0,
    lastUpdated: '2025-06-08T14:00:00Z',
  },
  {
    symbol: 'VNQ',
    name: 'Vanguard Real Estate ETF',
    type: EquityType.REIT,
    market: 'NYSE',
    currency: 'USD',
    price: 85.12,
    change: -0.43,
    changePercent: -0.5,
    volume: 3800000,
    marketCap: 75000000000,
    dividendYield: 3.25,
    lastUpdated: '2025-06-08T14:00:00Z',
  },
  {
    symbol: 'SCHH',
    name: 'Schwab U.S. REIT ETF',
    type: EquityType.REIT,
    market: 'NYSE',
    currency: 'USD',
    price: 21.56,
    change: 0.18,
    changePercent: 0.84,
    volume: 2200000,
    marketCap: 6200000000,
    dividendYield: 3.9,
    lastUpdated: '2025-06-08T14:00:00Z',
  },
  {
    symbol: 'VFIAX',
    name: 'Vanguard 500 Index Fund Admiral Shares',
    type: EquityType.MutualFund,
    market: 'NASDAQ',
    currency: 'USD',
    price: 412.11,
    change: 0.98,
    changePercent: 0.24,
    volume: 0,
    marketCap: 700000000000,
    dividendYield: 1.6,
    lastUpdated: '2025-06-08T14:00:00Z',
  },
  {
    symbol: 'FXAIX',
    name: 'Fidelity 500 Index Fund',
    type: EquityType.MutualFund,
    market: 'NASDAQ',
    currency: 'USD',
    price: 178.64,
    change: 0.56,
    changePercent: 0.31,
    volume: 0,
    marketCap: 320000000000,
    dividendYield: 1.45,
    lastUpdated: '2025-06-08T14:00:00Z',
  },
];

export const useEquityStore = create<EquityStore>((set) => ({
  equityList: mockedEquities,
  currentEquity: mockedEquities.length > 0 ? mockedEquities[0] : undefined,
  setCurrentEquity: (symbol: string) => {
    const equity = mockedEquities.find((eq) => eq.symbol === symbol);
    if (equity) {
      set({ currentEquity: equity });
    }
  },
}));
