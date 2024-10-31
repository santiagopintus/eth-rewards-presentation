"use client";
import {
  Block,
  BlocksContextProps,
  DateSpan,
} from "@src/model/blocks.interface";
import { createContext, useContext, useEffect, useState } from "react";

const BlocksContext = createContext<BlocksContextProps>(
  {} as BlocksContextProps
);

export const BlocksProvider = ({ children }: { children: React.ReactNode }) => {
  const [blocks, setBlocks] = useState<Block[] | null>(null);
  const [dateSpan, setDateSpan] = useState<DateSpan | null>(null);

  // useEffect(() => {
  //   if (dateSpan) {
  //     const { since, till } = dateSpan;
  //     const res = useFetch(since, till);
  //     console.log(res);
  //   }
  // }, [dateSpan]);

  return (
    <BlocksContext.Provider value={{ blocks, setDateSpan }}>
      {children}
    </BlocksContext.Provider>
  );
};

export const useBlocksContext = () => {
  return useContext(BlocksContext);
};
