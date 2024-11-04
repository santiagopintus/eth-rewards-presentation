"use client";
import { Block } from "@src/model/model.interface";
import LinePlot from "./LinePlot";
import { useState } from "react";
import { useBlocksContext } from "@src/context/BlocksContext";
import { CircularProgress, Skeleton } from "@mui/material";
import s from "@styles/chartContainer.module.scss";
import AdditionalInfo from "./AdditionalInfo";
import FocusedBlockData from "./FocusedBlockData";

const ChartContainer = () => {
  const { blocks } = useBlocksContext();
  const [focusedData, setFocusedData] = useState<Block | null>(null);

  return (
    <>
      <FocusedBlockData
        reward={focusedData?.reward}
        date={focusedData?.date.date}
      />
      <div className={s.chartContainer}>
        {blocks === null ? (
          <ChartLoading />
        ) : (
          <LinePlot data={blocks} setFocusedData={setFocusedData} />
        )}
      </div>
      <AdditionalInfo data={blocks} />
    </>
  );
};

const ChartLoading = () => {
  return (
    <>
      <div className={s.spinnerContainer}>
        <CircularProgress className={s.spinner} size={100} />
      </div>
      <Skeleton
        variant="rounded"
        height={410}
        width={"100%"}
        sx={{ backgroundColor: "#19243f" }}
      ></Skeleton>
    </>
  );
};

export default ChartContainer;
