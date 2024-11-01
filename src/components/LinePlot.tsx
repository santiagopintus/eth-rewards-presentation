import { useBlocksContext } from "@src/context/BlocksContext";
import * as d3 from "d3";
import { use, useEffect, useRef, useState } from "react";

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
  height = 400,
  marginTop = 20,
  marginRight = 30,
  marginBottom = 20,
  marginLeft = 70,
}: LinePlotProps) {
  const [width, setWidth] = useState(window.innerWidth * 0.8);
  const svgRef = useRef<SVGSVGElement>(null);
  const { isDarkMode } = useBlocksContext();
  const plotColor = isDarkMode ? "white" : "black";
  const xTicksInterval = Math.ceil(xData.length / 10) || 1;
  const xTicksValues = xData.filter((_, i) => i % xTicksInterval === 0);

  const x = d3.scalePoint(xData, [marginLeft, width - marginRight]);
  const y = d3.scaleLinear(
    [0, d3.max(yData) as number],
    [height - marginTop, marginBottom]
  );

  const line = d3.line((_, i) => x(xData[i]) as number, y);

  /* DRAWING AXIS */
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    svg.selectAll("g.axis").remove();
    /* Draw x axis */
    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickValues(xTicksValues));
    /* Draw y axis */
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y));
  }, [svgRef]);

  return (
    <svg height={height} ref={svgRef} style={{ width: "100%" }}>
      <path
        fill="none"
        stroke={plotColor}
        strokeWidth="1.5"
        d={line(yData) || undefined}
      />
      {/* <g fill={plotColor} stroke={plotColor} strokeWidth="1.5">
        {yData.map((_, i) => (
          <circle key={i} cx={x(i)} cy={y(d)} r="3" />
        ))}
      </g> */}
    </svg>
  );
}
