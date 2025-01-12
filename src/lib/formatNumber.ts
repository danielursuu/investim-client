export const formatNumber = (value: number | undefined | null): string => {
  if (value === undefined || value === null) return '0.00';
  
  const absValue = Math.abs(value);
  
  if (absValue >= 1_000_000) {
    return (value / 1_000_000).toFixed(2) + 'M';
  }
  
  if (absValue >= 1_000) {
    return (value / 1_000).toFixed(2) + 'K';
  }
  
  return value.toFixed(2);
};
