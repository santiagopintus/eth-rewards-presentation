import * as d3 from "d3";

type LinePlotProps = {
  yData: number[];
  xData: string[];
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
};

export default function LinePlot({
  yData,
  xData,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20,
}: LinePlotProps) {
  const x = d3.scaleLinear(
    [0, yData.length - 1],
    [marginLeft, width - marginRight]
  );
  const y = d3.scaleLinear(
    [0, d3.max(yData) as number],
    [height - marginTop, marginBottom]
  );

  const line = d3.line((d, i) => x(i), y);
  return (
    <svg width={width} height={height}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(yData) == null ? undefined : (line(yData) as string)}
      />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {yData.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
        ))}
      </g>
    </svg>
  );
}
