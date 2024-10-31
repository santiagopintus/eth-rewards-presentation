"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type Block = {
  reward: number;
  date: {
    date: string;
  };
};
export type DateSpan = {
  startDate: string;
  endDate: string;
};

export interface BlocksContextProps {
  blocks: Block[];
}

const BlocksContext = createContext<BlocksContextProps>({
  blocks: [],
});

export const BlocksProvider = ({ children }: { children: React.ReactNode }) => {
  const [blocks, setBlocks] = useState<Block[] | null>(null);
  const [dateSpan, setDateSpan] = useState<DateSpan | null>(null);

  return (
    <BlocksContext.Provider value={{ blocks: [] }}>
      {children}
    </BlocksContext.Provider>
  );
};

export const useBlocksContext = () => {
  return useContext(BlocksContext);
};
