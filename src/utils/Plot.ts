import { Measures } from "@src/components/LinePlot";
import { Block } from "@src/model/blocks.interface";
import * as d3 from "d3";
import { currencyFormatterUSD } from "./Utils";

type Plot = d3.Selection<SVGSVGElement, unknown, null, undefined>;

export const drawAxes = (
  plot: Plot,
  x: d3.ScaleTime<number, number, never>,
  y: d3.ScaleLinear<number, number, never>,
  measures: Measures,
  width: number
) => {
  // Draw x-axis
  plot
    .append("g")
    .attr("transform", `translate(0,${measures.H - measures.B})`)
    .call(d3.axisBottom(x));

  // Draw y-axis
  plot
    .append("g")
    .attr("transform", `translate(${measures.L},0)`)
    .call(d3.axisLeft(y).ticks(measures.H / 40))
    .call((g) =>
      g //Add horizontal lines
        .selectAll(".tick line")
        .clone()
        .attr("x2", width - measures.L)
        .attr("stroke-opacity", 0.1)
    )
    .call((g) =>
      g //Add y-axis label
        .append("text")
        .attr("x", -measures.L)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("Daily Rewards (USD)")
    );
};

export const drawDots = (
  svgPlot: Plot,
  data: Block[],
  x: d3.ScaleTime<number, number, never>,
  y: d3.ScaleLinear<number, number, never>,
  dotRadius: number,
  dotsColor: string
) => {
  return svgPlot
    .append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", (d) => x(new Date(d.date.date)) as number)
    .attr("cy", (d) => y(d.reward))
    .attr("r", dotRadius)
    .attr("fill", dotsColor)
    .attr("style", `filter: drop-shadow(0 0 5px ${dotsColor});`) //A little of glowing
    .style("opacity", 0); //Hide by default
};

/** Finds the closest dot to the left of the cursor and shows it
 * @param mouseX - The x coordinate of the cursor
 * @param dots - The selection of dots
 * @param x - The x scale
 */
export const highlightApropriateDot = (
  mouseX: number,
  dots: d3.Selection<
    d3.BaseType | SVGCircleElement,
    Block,
    SVGGElement,
    unknown
  >,
  x: d3.ScaleTime<number, number, never>
) => {
  let closestDot: SVGCircleElement | null = null;
  let closestX = -Infinity;
  let dataAboutClosestDot: Block | null = null;

  /* Find the closest dot to the left of the cursor */
  dots.each(function (d) {
    const cx = x(new Date(d.date.date));
    if (cx < mouseX && cx > closestX) {
      closestX = cx;
      closestDot = this as SVGCircleElement;
      dataAboutClosestDot = d;
    }
  });

  /* Show only the closest dot to the left */
  dots.style("opacity", 0);
  if (closestDot) {
    d3.select(closestDot).style("opacity", 1);
  }
  return dataAboutClosestDot;
};

/* GUIDELINES */
/** Helper function to create a guide line */
export const createGuideLine = (svgPlot: Plot, linesColor: string) =>
  svgPlot
    .append("line")
    .attr("stroke", linesColor)
    .attr("stroke-width", 1)
    .attr("stroke-dasharray", "5, 5")
    .style("opacity", 0); // Initially hidden

const getSafeX = (mouseX: number, measures: Measures, width: number) =>
  Math.max(measures.L, Math.min(mouseX, width));

const getSafeY = (mouseY: number, measures: Measures) =>
  Math.max(measures.T, Math.min(mouseY, measures.H - measures.B));

/** Determines the position of the guide lines according to the mouse position and calls moveGuideLine to move them */
export const handleGuidelinesPositions = (
  mouseX: number,
  mouseY: number,
  measures: Measures,
  width: number,
  vertGuideLine: d3.Selection<SVGLineElement, unknown, null, undefined>,
  horGuideLine: d3.Selection<SVGLineElement, unknown, null, undefined>
) => {
  /* Avoid going out of plot */
  const vertXpos = getSafeX(mouseX, measures, width);
  const horYpos = getSafeY(mouseY, measures);
  /* Update vertical guideline postion */
  moveGuideLine(
    vertGuideLine,
    vertXpos,
    measures.T,
    vertXpos,
    measures.H - measures.B
  );
  /* Update horizontal guideline postion */
  moveGuideLine(horGuideLine, measures.L, horYpos, width, horYpos);
};

/** Updates the position of the guide line according to the given coordinates */
export const moveGuideLine = (
  guideLine: d3.Selection<SVGLineElement, unknown, null, undefined>,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  guideLine
    .attr("x1", x1)
    .attr("x2", x2)
    .attr("y1", y1)
    .attr("y2", y2)
    .style("opacity", 1);
};

/************ DATA LABELS************/

/** Creates the svg elements for the data labels
 * @param plot - The plot svg element to append the elements to
 * @param labelColor - The color of the background
 */
export const createLabel = (plot: Plot, labelColor: string) => {
  // Crea la etiqueta de texto
  const label = plot
    .append("text")
    .attr("fill", "white") // Color del texto
    .attr("font-size", 16)
    /* ADD SHADOW without spread*/
    .style("filter", "box-shadow(0 0 5px white)")
    .style("opacity", 0); // Inicialmente oculto

  return label; // Devuelve ambos elementos
};

type Label = d3.Selection<SVGTextElement, unknown, null, undefined>;
export const updateLabels = (
  data: Block | null,
  rewardLabel: Label,
  dateLabel: Label,
  measures: Measures,
  width: number,
  mouseX: number,
  mouseY: number
) => {
  /* Mostrar la recompensa si hay un punto cercano */
  if (data) {
    const xPos = getSafeX(mouseX, measures, width);
    const yPos = getSafeY(mouseY, measures);
    const formatDate = d3.timeFormat("%d %b %Y");

    rewardLabel
      .attr("x", measures.L - 10)
      .attr("y", yPos)
      .attr("text-anchor", "end")
      .text(`${currencyFormatterUSD.format(data.reward)}`)
      .style("opacity", 1);
    dateLabel
      .attr("x", xPos - 50)
      .attr("y", measures.H - measures.B)
      .text(formatDate(new Date(data.date.date)))
      .style("opacity", 1);
  } else {
    rewardLabel.style("opacity", 0);
  }
};
