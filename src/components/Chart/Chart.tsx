import { useEffect, useRef } from 'react';
import { createChart, ColorType, AreaSeries } from 'lightweight-charts';

interface Props {
  width: number;
  height: number;
}

const Chart = ({ width, height }: Props) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'white' },
        textColor: 'white',
      },
      width,
      height,
      // height: chartContainerRef.current.clientHeight,
      // height: '100%',
    });
    const newSeries = chart.addSeries(AreaSeries, {
      lineColor: 'blue',
      topColor: 'rgba(0, 0, 255, 0.3)',
      bottomColor: 'rgba(0, 0, 255, 0.1)',
    });
    newSeries.setData(initialData);

    // TODO: understand why this is needed
    return () => {
      chart.remove();
    };
  }, [height, width]);

  return <div ref={chartContainerRef} />;
};

const initialData = [
  { time: '2018-12-22', value: 32.51 },
  { time: '2018-12-23', value: 31.11 },
  { time: '2018-12-24', value: 27.02 },
  { time: '2018-12-25', value: 27.32 },
  { time: '2018-12-26', value: 25.17 },
  { time: '2018-12-27', value: 28.89 },
  { time: '2018-12-28', value: 25.46 },
  { time: '2018-12-29', value: 23.92 },
  { time: '2018-12-30', value: 22.68 },
  { time: '2018-12-31', value: 22.67 },
];

export default Chart;
