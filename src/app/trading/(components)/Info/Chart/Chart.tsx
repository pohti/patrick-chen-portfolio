import { useEffect, useRef, useState, useCallback } from 'react';
import { createChart, ColorType, AreaSeries } from 'lightweight-charts';
import { chartData } from '@/store/instrumentHistory';
import { useEquityStore } from '@/store/equity';

const MIN_CHART_HEIGHT = 300; // Minimum height for the chart
const MIN_CHART_WIDTH = 600; // Minimum width for the chart

const FILTERS = [
  { label: '1W', value: '1w', days: 7 },
  { label: '1M', value: '1m', days: 30 },
  { label: '3M', value: '3m', days: 90 },
  { label: '1Y', value: '1y', days: 365 },
  { label: '2Y', value: '2y', days: 730 },
];

const Chart = () => {
  const { currentEquity } = useEquityStore();
  const symbol = currentEquity?.symbol || 'AAPL';

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const parentContainerRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const headerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const [chartHeight, setChartHeight] = useState(MIN_CHART_HEIGHT);
  const [chartWidth, setChartWidth] = useState(MIN_CHART_WIDTH);
  const [selectedFilter, setSelectedFilter] = useState('1y');

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

    // Always show all data
    const allData = chartData[symbol] || [];
    newSeries.setData(allData);

    // Zoom to filtered range
    if (allData.length > 0) {
      const filter = FILTERS.find((f) => f.value === selectedFilter);
      if (filter) {
        const lastIdx = allData.length - 1;
        const firstIdx = Math.max(0, lastIdx - filter.days + 1);
        chart.timeScale().setVisibleRange({
          from: allData[firstIdx].time as string,
          to: allData[lastIdx].time as string,
        });
      }
    }

    return () => {
      chart.remove();
    };
  }, [chartHeight, chartWidth, symbol, selectedFilter]);

  return (
    <div
      ref={parentContainerRef}
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Controls */}
      <div
        ref={controlsRef}
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 8,
          justifyContent: 'flex-start', // changed from 'flex-end'
        }}
      >
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setSelectedFilter(filter.value)}
            style={{
              padding: '4px 12px',
              borderRadius: 4,
              border:
                selectedFilter === filter.value
                  ? '2px solid #2962FF'
                  : '1px solid #ccc',
              background:
                selectedFilter === filter.value
                  ? '#2962FF'
                  : 'var(--background)',
              color: selectedFilter === filter.value ? '#fff' : '#ccc',
              cursor: 'pointer',
              fontWeight: selectedFilter === filter.value ? 'bold' : 'normal',
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>
      {/* Chart container fills all available space */}
      <div
        ref={chartContainerRef}
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
        }}
      />
    </div>
  );
};

export default Chart;
