import { Button } from "@mui/material";
import { DateSpan } from "@src/model/blocks.interface";
import React from "react";

type DateSelectorBtnProps = {
  setDateSpan: React.Dispatch<React.SetStateAction<DateSpan | null>>;
  text: string;
  since: string;
};

const DateSelectorBtn = ({
  setDateSpan,
  text,
  since,
}: DateSelectorBtnProps) => {
  // till //TODAY AS ISO
  const till = new Date().toISOString();
  return <Button onClick={() => setDateSpan({ since, till })}>{text}</Button>;
};

export default DateSelectorBtn;
