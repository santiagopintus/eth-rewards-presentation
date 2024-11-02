"use client";
import { Block } from "@src/model/blocks.interface";
import LinePlot from "./LinePlot";
import { useEffect, useState } from "react";
import { useBlocksContext } from "@src/context/BlocksContext";
import { Skeleton } from "@mui/material";
import s from "@styles/chartContainer.module.scss";
import AdditionalInfo from "./AdditionalInfo";
import FocusedBlockData from "./FocusedBlockData";

type ChartProps = {
  data?: Block[];
};

const ChartContainer = ({ data }: ChartProps) => {
  const [blocks, setBlocks] = useState<Block[] | null>(data || null); //Data is passed from page as the initial state
  const { blocks: ctxtBlocks } = useBlocksContext();
  const [focusedData, setFocusedData] = useState<Block | null>(null);

  useEffect(() => {
    setBlocks(ctxtBlocks);
  }, [ctxtBlocks]);

  return (
    <>
      <FocusedBlockData
        reward={focusedData?.reward}
        date={focusedData?.date.date}
      />
      <div className={s.chartContainer}>
        {!blocks ? (
          <ChartSkeleton />
        ) : (
          <LinePlot data={blocks} setFocusedData={setFocusedData} />
        )}
      </div>
      <AdditionalInfo data={blocks} />
    </>
  );
};

const ChartSkeleton = () => {
  return <Skeleton variant="rounded" height={"100%"} width={"100%"} />;
};

export default ChartContainer;
