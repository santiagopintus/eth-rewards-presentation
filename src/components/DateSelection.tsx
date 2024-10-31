"use client";
import { useBlocksContext } from "@src/context/BlocksContext";
import React from "react";
import DateSelectorBtn from "./DateSelectorSince";
import { getDateDaysAgo } from "@src/utils/Utils";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateSpan } from "@src/model/blocks.interface";
import dayjs, { Dayjs } from "dayjs";

const DateSelection = () => {
  const ctxt = useBlocksContext();
  const defaultSince = getDateDaysAgo(30);
  const defaultTill = new Date();
  const { dateSpan, setDateSpan } = ctxt;

  const setNewDate = (selectedDate: Dayjs, type: keyof DateSpan) => {
    setDateSpan({
      ...dateSpan,
      [type]: selectedDate,
    } as DateSpan);
  };

  const onDateChange = (newDate: Dayjs | null, type: keyof DateSpan) => {
    console.log(newDate);

    if (newDate) {
      setNewDate(newDate, type);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="date-selection-options">
        <DateSelectorBtn
          setDateSpan={setDateSpan}
          text="1M"
          since={getDateDaysAgo(30)}
        />
        {/* Since date */}
        <DatePicker
          value={dayjs(dateSpan?.since || defaultSince)}
          onChange={(d) => onDateChange(d, "since")}
        />
        {/* Until date */}
        <DatePicker
          value={dayjs(dateSpan?.till || defaultTill)}
          onChange={(d) => onDateChange(d, "till")}
        />
      </div>
    </LocalizationProvider>
  );
};

export default DateSelection;
