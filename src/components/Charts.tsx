import { Block } from "@src/model/blocks.interface";
import LinePlot from "./LinePlot";

type ChartProps = {
  data: Block[];
};

const Chart = ({ data }: ChartProps) => {
  const yData = data.map((d) => d.reward);
  const xData = data.map((d) => d.date.date);
  return <LinePlot yData={yData} xData={xData} />;
};

export default Chart;
