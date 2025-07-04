import { useEffect, useRef, useState, useCallback } from 'react';
import { createChart, ColorType, AreaSeries } from 'lightweight-charts';
import { Radio } from 'antd';
import TradingHeader from '../../components/TradingHeader';

const { Group: RadioGroup, Button: RadioButton } = Radio;

const MIN_CHART_HEIGHT = 300; // Minimum height for the chart
const MIN_CHART_WIDTH = 600; // Minimum width for the chart

const Chart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const parentContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const [chartHeight, setChartHeight] = useState(330);
  const [chartWidth, setChartWidth] = useState(800);

  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    const { height, width } = entries[0].contentRect;
    console.log('resize event:', { height, width });

    // Calculate chart dimensions by subtracting space for header and controls
    const headerHeight = headerRef.current?.offsetHeight || 40; // Approximate height of TradingHeader
    const controlsHeight = controlsRef.current?.offsetHeight || 40; // Approximate height of RadioGroup
    const padding = 10; // Total padding/margin

    const newWidth = width - padding;
    const newHeight = height - headerHeight - controlsHeight - padding;

    console.log('calculated chart dimensions:', {
      height,
      width,
      newHeight,
      newWidth,
      controlsHeight,
    });
    // Ensure minimum dimensions
    setChartWidth(Math.max(newWidth, MIN_CHART_WIDTH));
    setChartHeight(Math.max(newHeight, MIN_CHART_HEIGHT));
  }, []);

  useEffect(() => {
    if (!parentContainerRef.current) return;

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(parentContainerRef.current);

    return () => resizeObserver.disconnect();
  }, [handleResize]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'white' },
        textColor: 'white',
      },
      width: chartWidth,
      height: chartHeight,
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
  }, [chartHeight, chartWidth]);

  return (
    <div className="trading-grid-item" ref={parentContainerRef}>
      <div ref={headerRef}>
        <TradingHeader text="Chart" />
      </div>

      <div style={{ margin: '5px' }}>
        <RadioGroup ref={controlsRef}>
          <RadioButton value="1">1D</RadioButton>
          <RadioButton value="5">5D</RadioButton>
          <RadioButton value="1M">1M</RadioButton>
          <RadioButton value="3M">3M</RadioButton>
          <RadioButton value="6M">6M</RadioButton>
          <RadioButton value="1Y">1Y</RadioButton>
        </RadioGroup>
        <div ref={chartContainerRef} />
      </div>
    </div>
  );
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
