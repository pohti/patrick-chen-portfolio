'use server';

import { DefaultApi } from 'finnhub';

export interface EarningEvent {
  date: string;
  epsActual: number | null;
  epsEstimate: number | null;
  hour: 'amc' | 'bmo' | string;
  quarter: number;
  revenueActual: number | null;
  revenueEstimate: number | null;
  symbol: string;
  year: number;
}

interface EarningCalendarResp {
  earningsCalendar: EarningEvent[];
}

const finnhubClient = new DefaultApi(process.env.FINNHUB_API_KEY || '');

export const getEarningsCalendar = async (
  symbol: string
): Promise<EarningEvent[]> => {
  const currentYear = new Date().getFullYear();
  const options = {
    from: `${currentYear}-01-01`,
    to: `${currentYear}-12-31`,
    symbol: symbol,
  };

  return new Promise((resolve, reject) => {
    finnhubClient.earningsCalendar(options, (error, data) => {
      if (error) {
        reject(error);
      } else {
        const events = (data as EarningCalendarResp).earningsCalendar;
        resolve(events as EarningEvent[]);
      }
    });
  });
};
