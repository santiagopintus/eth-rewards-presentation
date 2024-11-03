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
  setBlocks: React.Dispatch<React.SetStateAction<Block[] | null>>;
  dateSpan: DateSpan | null;
  setDateSpan: React.Dispatch<React.SetStateAction<DateSpan | null>>;
}
export interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}
