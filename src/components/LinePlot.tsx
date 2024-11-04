"use client";
import * as d3 from "d3";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { Block, Measures } from "@src/model/model.interface";
import { useThemeContext } from "@src/context/ThemeContext";
import {
  createGuideLine,
  createScales,
  drawAxes,
  drawDots,
  drawLine,
  listenMouseEvents,
} from "@src/utils/Plot";

type LinePlotProps = {
  data: Block[];
  setFocusedData: React.Dispatch<SetStateAction<Block | null>>;
  measures?: Measures;
  dotRadius?: number;
};

/**
 * LinePlot is a React component that visualizes an array of Block data as a line plot using D3.js.
 * It renders a SVG element with a plot area and a guide line for the X and Y axes.
 * @prop data - The array of Block data to be plotted.
 * @prop setFocusedData - A function to set the focused data in the context.
 * @prop measures - An object with the dimensions of the plot area.
 * @prop dotRadius - The radius of the dots representing the data points.
 */
export default function LinePlot({
  data,
  setFocusedData,
  measures = {
    W: 1200, //WIDTH
    H: 400, //HEIGHT
    R: 30, //RIGHT
    L: 70, //LEFT
    T: 30, //TOP
    B: 20, //BOTTOM
  },
  dotRadius = 3,
}: LinePlotProps) {
  const [plotSizes, setPlotSizes] = useState<Measures>(measures);
  const { isDarkMode } = useThemeContext();
  const plotColor = isDarkMode ? "#00ffff" : "black";
  const guideLinesColor = isDarkMode ? "#fff" : "#000";
  const svgRef = useRef<SVGSVGElement>(null);

  /* Update width according to viewport size */
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPlotSizes({
        ...plotSizes,
        W: Math.min(window.innerWidth * 0.8, 1200),
      });
    }
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;
    const svgPlot = d3.select(svgRef.current);

    const { x, y } = createScales(data, measures);

    drawAxes(svgPlot, x, y, measures);

    /* Draw main plot line */
    drawLine(svgPlot, data, x, y, plotColor);

    // Initialize guide lines for X and Y axes
    const vertGuideLine = createGuideLine(svgPlot, guideLinesColor);
    const horGuideLine = createGuideLine(svgPlot, guideLinesColor);

    //Draw dots on each line vertices
    const dots = drawDots(svgPlot, data, x, y, dotRadius, plotColor);

    // Listen to mousemove event on the SVG element
    listenMouseEvents(
      svgPlot,
      setFocusedData,
      measures,
      vertGuideLine,
      horGuideLine,
      dots,
      x
    );
  }, [
    data,
    measures.H,
    measures.T,
    measures.R,
    measures.B,
    measures.L,
    plotColor,
    dotRadius,
    guideLinesColor,
    setFocusedData,
  ]);

  return (
    <svg
      data-testid="linePlot"
      ref={svgRef}
      width={measures.W}
      height={measures.H}
    />
  );
}
