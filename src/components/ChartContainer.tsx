"use client";
import { Block } from "@src/model/blocks.interface";
import LinePlot from "./LinePlot";
import { useEffect, useState } from "react";
import { useBlocksContext } from "@src/context/BlocksContext";
import { Skeleton } from "@mui/material";
import s from "@styles/chartContainer.module.scss";

type ChartProps = {
  data?: Block[];
};

const ChartContainer = ({ data }: ChartProps) => {
  const [blocks, setBlocks] = useState<Block[] | null>(data || null); //Data is passed from page as the initial state
  const [yData, setYData] = useState<number[]>([]);
  const [xData, setXData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { blocks: ctxtBlocks } = useBlocksContext();

  useEffect(() => {
    setBlocks(ctxtBlocks);
    setLoading(true);
  }, [ctxtBlocks]);

  useEffect(() => {
    if (blocks) {
      setYData(blocks.map((d) => d.reward));
      setXData(blocks.map((d) => d.date.date));
    }
  }, [blocks]);

  useEffect(() => {
    if (yData && xData) {
      setLoading(false);
    }
  }, [yData, xData]);

  return (
    <div className={s.chartContainer}>
      {loading ? <ChartSkeleton /> : <LinePlot yData={yData} xData={xData} />}
    </div>
  );
};

const ChartSkeleton = () => {
  return <Skeleton variant="rounded" height={"100%"} width={"100%"} />;
};

export default ChartContainer;
