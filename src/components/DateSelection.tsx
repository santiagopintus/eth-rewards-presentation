"use client";
import { useBlocksContext } from "@src/context/BlocksContext";
import React from "react";
import DateSelectorBtn from "./DateSelectorBtn";
import { getDateDaysAgo } from "@src/utils/Utils";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateSpan } from "@src/model/blocks.interface";
import dayjs, { Dayjs } from "dayjs";
import s from "@styles/chartContainer.module.scss";

const DateSelection = () => {
  const ctxt = useBlocksContext();
  const defaultSince = getDateDaysAgo(30);
  const defaultTill = new Date();
  const { dateSpan, setDateSpan } = ctxt;
  const dateSelectionOptions = [
    { label: "1M", value: 30 },
    { label: "3M", value: 90 },
    { label: "6M", value: 180 },
    { label: "1Y", value: 365 },
  ];

  const setNewDate = (selectedDate: Date, type: keyof DateSpan) => {
    /* Clear blocks from context to trigger loading*/
    const newDateSpan = {
      ...dateSpan,
      [type]: selectedDate,
    } as DateSpan;

    setDateSpan(newDateSpan);
  };

  const onDateChange = (newDate: Dayjs | null, type: keyof DateSpan) => {
    if (newDate) {
      setNewDate(newDate.toDate(), type);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={s.dateSelectionOptions}>
        {dateSelectionOptions.map((option) => (
          <DateSelectorBtn
            setDateSpan={setDateSpan}
            text={option.label}
            since={getDateDaysAgo(option.value)}
          />
        ))}
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
