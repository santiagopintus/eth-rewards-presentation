const isWindowLessThan = (width: number) => window.innerWidth < width;

const getXTicksInterval = (xData: string[]): number => {
  const ticksAmount = isWindowLessThan(600)
    ? 8
    : isWindowLessThan(800)
    ? 10
    : 20;
  if (xData.length < ticksAmount) return 1;
  return Math.ceil(xData.length / ticksAmount);
};

export const getXTicksValues = (xData: any[]) => {
  return xData.filter((_, i) => i % getXTicksInterval(xData) === 0);
};
