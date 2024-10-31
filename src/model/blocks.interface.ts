export type Block = {
  reward: number;
  date: {
    date: string;
  };
};

export type DateSpan = {
  since: string;
  till: string;
};

export interface BlocksContextProps {
  blocks: Block[] | null;
  setDateSpan: React.Dispatch<React.SetStateAction<DateSpan | null>>;
}
