"use client";
import { useBlocksContext } from "@src/context/BlocksContext";
import React from "react";
import DateSelectorBtn from "./DateSelectorSince";
import { getTimeAgo } from "@src/utils/Utils";

const DateSelection = () => {
  const ctxt = useBlocksContext();
  const { setDateSpan } = ctxt;
  return (
    <DateSelectorBtn
      setDateSpan={setDateSpan}
      text="1M"
      since={getTimeAgo(30)}
    />
  );
};

export default DateSelection;
