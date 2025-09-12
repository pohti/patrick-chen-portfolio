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

export const chartData: Record<string, AreaData[]> = {
  AAPL: generateStockData('2024-01-01', endDate, 170),
  GOOGL: generateStockData('2024-01-01', endDate, 130),
  VOO: generateStockData('2024-01-01', endDate, 400),
  QQQ: generateStockData('2024-01-01', endDate, 350),
  SPX: generateStockData('2024-01-01', endDate, 4500),
  IXIC: generateStockData('2024-01-01', endDate, 14000),
  NVQ: generateStockData('2024-01-01', endDate, 100),
  SCHH: generateStockData('2024-01-01', endDate, 70),
  VFIAX: generateStockData('2024-01-01', endDate, 400),
  FXAIX: generateStockData('2024-01-01', endDate, 150),
  VNQ: generateStockData('2024-01-01', endDate, 80),
  // ...add more symbols as needed
};
