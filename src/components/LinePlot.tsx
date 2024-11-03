"use client";
import * as d3 from "d3";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { Block } from "@src/model/blocks.interface";
import { useThemeContext } from "@src/context/ThemeContext";
import {
  createGuideLine,
  createLabel,
  drawAxes,
  drawDots,
  handleGuidelinesPositions,
  highlightApropriateDot,
  moveGuideLine,
  updateLabels,
} from "@src/utils/Plot";

export type Measures = {
  H: number;
  R: number;
  L: number;
  T: number;
  B: number;
};

type LinePlotProps = {
  data: Block[];
  setFocusedData: React.Dispatch<SetStateAction<Block | null>>;
  measures?: Measures;
  dotRadius?: number;
};

export default function LinePlot({
  data,
  setFocusedData,
  measures = {
    H: 400, //HEIGHT
    R: 30, //RIGHT
    L: 70, //LEFT
    T: 30, //TOP
    B: 20, //BOTTOM
  },
  dotRadius = 3,
}: LinePlotProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { isDarkMode } = useThemeContext();
  const plotColor = isDarkMode ? "#00ffff" : "black";
  const guideLinesColor = isDarkMode ? "#fff" : "#000";

  const [width] = useState(
    typeof window !== "undefined" ? Math.min(window.innerWidth * 0.8, 1200) : 0
  );

  useEffect(() => {
    if (!svgRef.current) return;
    const svgPlot = d3.select(svgRef.current);

    /* Time scale for x-axis */
    const parsedDates = data.map((d) => new Date(d.date.date));
    const x = d3
      .scaleTime()
      .domain([d3.min(parsedDates) as Date, d3.max(parsedDates) as Date])
      .range([measures.L, width - measures.R])
      .nice();

    /* Linear scale for y-axis */
    const y = d3
      .scaleLinear(
        [0, d3.max(data, (d) => d.reward) as number],
        [measures.H - measures.B, measures.T]
      )
      .nice();

    drawAxes(svgPlot, x, y, measures, width);

    const line = d3
      .line<Block>()
      .x((d) => x(new Date(d.date.date)) as number)
      .y((d) => y(d.reward));

    // Draw main line
    svgPlot
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", plotColor)
      .attr("stroke-width", 1.5)
      .attr("d", line(data));

    // Initialize guide lines for X and Y axes
    const vertGuideLine = createGuideLine(svgPlot, guideLinesColor);
    const horGuideLine = createGuideLine(svgPlot, guideLinesColor);

    //Draw dots
    const dots = drawDots(svgPlot, data, x, y, dotRadius, plotColor);

    // Listen to mousemove event on the SVG element
    svgPlot.on("mousemove", (e) => {
      const [mouseX, mouseY] = d3.pointer(e);
      setFocusedData(highlightApropriateDot(mouseX, dots, x));
      handleGuidelinesPositions(
        mouseX,
        mouseY,
        measures,
        width,
        vertGuideLine,
        horGuideLine
      );
    });
    svgPlot.on("mouseleave", () => {
      highlightApropriateDot(-Infinity, dots, x);
      setFocusedData(null);
      horGuideLine.style("opacity", 0);
      vertGuideLine.style("opacity", 0);
    });
  }, [
    data,
    width,
    measures.H,
    measures.T,
    measures.R,
    measures.B,
    measures.L,
    plotColor,
  ]);

  return <svg ref={svgRef} width={width} height={measures.H} />;
}
