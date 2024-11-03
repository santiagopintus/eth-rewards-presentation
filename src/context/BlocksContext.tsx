"use client";
import { fetchEthRewards } from "@src/hooks/useFetch";
import { useRuntimeEnv } from "@src/hooks/useRuntimeEnv";
import {
  Block,
  BlocksContextProps,
  DateSpan,
} from "@src/model/blocks.interface";
import { getDateDaysAgo } from "@src/utils/Utils";
import { createContext, useContext, useEffect, useState } from "react";

const BlocksContext = createContext<BlocksContextProps>(
  {} as BlocksContextProps
);

export const BlocksProvider = ({ children }: { children: React.ReactNode }) => {
  const [blocks, setBlocks] = useState<Block[] | null>(null);
  /* Default date span is 30 days ago until now */
  const [dateSpan, setDateSpan] = useState<DateSpan | null>({
    since: getDateDaysAgo(30),
    till: new Date(),
  });

  const { NEXT_PUBLIC_API_BASE_URL, NEXT_PUBLIC_API_KEY } = useRuntimeEnv();

  const refreshBlocks = async () => {
    if (dateSpan && NEXT_PUBLIC_API_BASE_URL && NEXT_PUBLIC_API_KEY) {
      setBlocks(null);
      setBlocks(
        (await fetchEthRewards(
          NEXT_PUBLIC_API_BASE_URL,
          NEXT_PUBLIC_API_KEY,
          dateSpan.since.toISOString(),
          dateSpan.till.toISOString()
        )) || null
      );
    }
  };

  useEffect(() => {
    if (dateSpan !== null) {
      refreshBlocks();
    }
  }, [dateSpan]);

  return (
    <BlocksContext.Provider
      value={{ blocks, setBlocks, dateSpan, setDateSpan }}
    >
      {children}
    </BlocksContext.Provider>
  );
};

export const useBlocksContext = () => useContext(BlocksContext);
