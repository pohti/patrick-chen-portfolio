declare module 'finnhub' {
  type FinnhubCallback<T = unknown> = (
    error: Error | null,
    data: T,
    response: Response | null
  ) => void;

  export class DefaultApi {
    constructor(apiKey: string);

    companyNews(
      symbol: string,
      from: string,
      to: string,
      callback: FinnhubCallback
    ): void;
    quote(symbol: string, callback: FinnhubCallback): void;
    stockCandles(
      symbol: string,
      resolution: string,
      from: number,
      to: number,
      callback: FinnhubCallback
    ): void;
    companyProfile2(
      opts: { symbol?: string; isin?: string; cusip?: string },
      callback: FinnhubCallback
    ): void;
    earningsCalendar(
      opts: {
        from?: string;
        to?: string;
        symbol?: string;
        international?: boolean;
      },
      callback: FinnhubCallback
    ): void;
    marketNews(
      category: string,
      opts: { minId?: string },
      callback: FinnhubCallback
    ): void;

    // Add other methods as needed
    [key: string]: unknown;
  }
}
