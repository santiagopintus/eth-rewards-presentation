export type Block = {
  reward: number;
  date: {
    date: string;
  };
};

export type DateSpan = {
  since: Date;
  till: Date;
};

export interface BlocksContextProps {
  blocks: Block[] | null;
  dateSpan: DateSpan | null;
  setDateSpan: React.Dispatch<React.SetStateAction<DateSpan | null>>;
}
