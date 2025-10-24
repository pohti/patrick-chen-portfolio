import { type AreaData } from 'lightweight-charts';

function generateStockData(
  startDate: string,
  endDate: string,
  startPrice: number,
  drift: number = 0.0002, // average daily return
  volatility: number = 0.02 // daily volatility
): AreaData[] {
  const data: AreaData[] = [];
  let price = startPrice;
  const currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    // Only add weekdays (skip weekends)
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      data.push({
        time: currentDate.toISOString().slice(0, 10),
        value: Number(price.toFixed(2)),
      });
      // Simulate next price
      const randomShock = drift + volatility * (Math.random() - 0.5);
      price = Math.max(1, price * (1 + randomShock));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return data;
}

const today = new Date();
const endDate = today.toISOString().slice(0, 10);

// Calculate start date as 2 years ago from today
const twoYearsAgo = new Date(today);
twoYearsAgo.setFullYear(today.getFullYear() - 2);
const startDate = twoYearsAgo.toISOString().slice(0, 10);

export const chartData: Record<string, AreaData[]> = {
  AAPL: generateStockData(startDate, endDate, 170),
  GOOGL: generateStockData(startDate, endDate, 130),
  VOO: generateStockData(startDate, endDate, 400),
  QQQ: generateStockData(startDate, endDate, 350),
  SPX: generateStockData(startDate, endDate, 4500),
  IXIC: generateStockData(startDate, endDate, 14000),
  NVQ: generateStockData(startDate, endDate, 100),
  SCHH: generateStockData(startDate, endDate, 70),
  VFIAX: generateStockData(startDate, endDate, 400),
  FXAIX: generateStockData(startDate, endDate, 150),
  VNQ: generateStockData(startDate, endDate, 80),
  // ...add more symbols as needed
};
