import { useEffect, useRef, useState, useCallback } from 'react';
import { createChart, ColorType, AreaSeries } from 'lightweight-charts';
// import { Radio } from 'antd';
import TradingHeader from '../../components/TradingHeader';
import { chartData } from '@/store/chartData';
import { useEquityStore } from '@/store/equity';

// const { Group: RadioGroup, Button: RadioButton } = Radio;

const MIN_CHART_HEIGHT = 300; // Minimum height for the chart
const MIN_CHART_WIDTH = 600; // Minimum width for the chart

const Chart = () => {
  const { currentEquity } = useEquityStore();
  const symbol = currentEquity?.symbol || 'AAPL';

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const parentContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const [chartHeight, setChartHeight] = useState(330);
  const [chartWidth, setChartWidth] = useState(800);

  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    const { height, width } = entries[0].contentRect;

    // Calculate chart dimensions by subtracting space for header and controls
    const headerHeight = headerRef.current?.offsetHeight || 40; // Approximate height of TradingHeader
    const controlsHeight = controlsRef.current?.offsetHeight || 40; // Approximate height of RadioGroup
    const padding = 10; // Total padding/margin

    const newWidth = width - padding;
    const newHeight = height - headerHeight - controlsHeight - padding;

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
        background: { type: ColorType.Solid, color: 'var(--background)' },
        textColor: 'white',
      },
      width: chartWidth,
      height: chartHeight,
    });
    const newSeries = chart.addSeries(AreaSeries, {
      lineColor: '#2962FF',
      topColor: '#2962FF',
      bottomColor: 'rgba(41, 98, 255, 0.28)',
    });
    newSeries.setData(chartData[symbol] || []);
    // TODO: understand why this is needed
    return () => {
      chart.remove();
    };
  }, [chartHeight, chartWidth, symbol]);

  return (
    <div className="trading-grid-item" ref={parentContainerRef}>
      <div ref={headerRef}>
        <TradingHeader text="Chart" />
      </div>

      <div style={{ margin: '5px' }}>
        {/* <RadioGroup ref={controlsRef}>
          <RadioButton value="1">1D</RadioButton>
          <RadioButton value="5">5D</RadioButton>
          <RadioButton value="1M">1M</RadioButton>
          <RadioButton value="3M">3M</RadioButton>
          <RadioButton value="6M">6M</RadioButton>
          <RadioButton value="1Y">1Y</RadioButton>
        </RadioGroup> */}
        <div ref={chartContainerRef} />
      </div>
    </div>
  );
};

export default Chart;
