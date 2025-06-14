'use client';

import { create } from 'zustand';
import { mockedEquities, type Equity } from './data';

type EquityStore = {
  equityList: Equity[];
  currentEquity: string;
  setCurrentEquity: (equity: string) => void;
  getCurrentEquity: () => Equity | null;
};

export const useEquityStore = create<EquityStore>((set, get) => ({
  equityList: mockedEquities,
  currentEquity: mockedEquities.length > 0 ? mockedEquities[0].symbol : '',
  setCurrentEquity: (equity) => set({ currentEquity: equity }),
  getCurrentEquity: () =>
    mockedEquities.find((e) => e.symbol === get().currentEquity) || null,
}));
