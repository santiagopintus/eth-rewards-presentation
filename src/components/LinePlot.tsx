"use client";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { Block } from "@src/model/blocks.interface";
import { getXTicksValues } from "@src/utils/Plot";
import { useThemeContext } from "@src/context/ThemeContext";
import { datePickerToolbarClasses } from "@mui/x-date-pickers";

type LinePlotProps = {
  data: Block[];
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
};

export default function LinePlot({
  data,
  height = 400,
  marginTop = 20,
  marginRight = 30,
  marginBottom = 20,
  marginLeft = 70,
}: LinePlotProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { isDarkMode } = useThemeContext();
  const plotColor = isDarkMode ? "#00ffff" : "black";
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth * 0.8 : 0
  );

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    const parsedDates = data.map((d) => new Date(d.date.date));
    const x = d3
      .scaleTime()
      .domain([d3.min(parsedDates) as Date, d3.max(parsedDates) as Date])
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleLinear(
        [0, d3.max(data, (d) => d.reward) as number],
        [height - marginBottom, marginTop]
      )
      .nice();

    // Draw x-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x));

    // Draw y-axis
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1)
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("Daily Rewards (USD)")
      );

    const line = d3
      .line<Block>()
      .x((d) => x(new Date(d.date.date)) as number)
      .y((d) => y(d.reward));

    // Draw line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", plotColor)
      .attr("stroke-width", 1.5)
      .attr("d", line(data));
  }, [
    data,
    width,
    height,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    plotColor,
  ]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ maxWidth: "100%", height: "auto" }}
    />
  );
}
