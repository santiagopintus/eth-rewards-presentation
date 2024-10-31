import { Button } from "@mui/material";
import { DateSpan } from "@src/model/blocks.interface";
import React from "react";

type DateSelectorBtnProps = {
  setDateSpan: React.Dispatch<React.SetStateAction<DateSpan | null>>;
  text: string;
  since: Date;
};

const DateSelectorBtn = ({
  setDateSpan,
  text,
  since,
}: DateSelectorBtnProps) => {
  // till //TODAY AS ISO
  return (
    <Button onClick={() => setDateSpan({ since, till: new Date() })}>
      {text}
    </Button>
  );
};

export default DateSelectorBtn;
