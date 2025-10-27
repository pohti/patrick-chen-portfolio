export const formatRevenue = (value: number | null): string => {
  if (value === null || value === undefined) {
    return 'N/A';
  }

  const absValue = Math.abs(value);

  if (absValue >= 1e9) {
    // Billions
    const formatted = (value / 1e9).toFixed(1);
    return `${formatted} B`;
  } else if (absValue >= 1e6) {
    // Millions
    const formatted = (value / 1e6).toFixed(1);
    return `${formatted} M`;
  } else if (absValue >= 1e3) {
    // Thousands
    const formatted = (value / 1e3).toFixed(1);
    return `${formatted} K`;
  } else {
    // Less than thousands
    return value.toFixed(0);
  }
};
