"use client";
import { Block } from "@src/model/blocks.interface";
import LinePlot from "./LinePlot";
import { useEffect, useState } from "react";
import { useBlocksContext } from "@src/context/BlocksContext";
import { Skeleton } from "@mui/material";
import s from "@styles/chartContainer.module.scss";
import AdditionalInfo from "./AdditionalInfo";

type ChartProps = {
  data?: Block[];
};

const ChartContainer = ({ data }: ChartProps) => {
  const [blocks, setBlocks] = useState<Block[] | null>(data || null); //Data is passed from page as the initial state
  const { blocks: ctxtBlocks } = useBlocksContext();

  useEffect(() => {
    setBlocks(ctxtBlocks);
  }, [ctxtBlocks]);

  return (
    <>
      <div className={s.chartContainer}>
        {!blocks ? <ChartSkeleton /> : <LinePlot data={blocks} />}
      </div>
      <AdditionalInfo data={blocks} />
    </>
  );
};

const ChartSkeleton = () => {
  return <Skeleton variant="rounded" height={"100%"} width={"100%"} />;
};

export default ChartContainer;
