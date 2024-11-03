"use client";
import { useBlocksContext } from "@src/context/BlocksContext";
import React from "react";
import DateSelectorBtn from "./DateSelectorBtn";
import { getDateDaysAgo } from "@src/utils/Utils";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateSpan } from "@src/model/blocks.interface";
import dayjs, { Dayjs } from "dayjs";
import s from "@styles/dateSelection.module.scss";

const DateSelection = () => {
  const { dateSpan, setBlocks, setDateSpan } = useBlocksContext();
  const defaultSince = getDateDaysAgo(30);
  const defaultTill = new Date();

  const dateSelectionOptions = [
    { label: "1M", value: 30 },
    { label: "3M", value: 90 },
    { label: "6M", value: 180 },
    { label: "1Y", value: 365 },
  ];

  const setNewDate = (selectedDate: Date, type: keyof DateSpan) => {
    const newDateSpan = {
      ...dateSpan,
      [type]: selectedDate,
    } as DateSpan;

    setDateSpan(newDateSpan);
  };

  const onDateChange = (newDate: Dayjs | null, type: keyof DateSpan) => {
    /* Clear blocks from context to trigger loading*/
    setBlocks(null);
    if (newDate) {
      setNewDate(newDate.toDate(), type);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={s.dateSelectionOptions}>
        {dateSelectionOptions.map((option) => (
          <DateSelectorBtn
            key={option.label}
            setDateSpan={setDateSpan}
            text={option.label}
            since={getDateDaysAgo(option.value)}
          />
        ))}
        <div className={s.datePickersContainer}></div>
        {/* Since date */}
        <DatePicker
          label="Desde"
          value={dayjs(dateSpan?.since || defaultSince)}
          onChange={(d) => onDateChange(d, "since")}
          sx={{ width: 150 }}
        />
        {/* Until date */}
        <DatePicker
          label="Hasta"
          value={dayjs(dateSpan?.till || defaultTill)}
          onChange={(d) => onDateChange(d, "till")}
          sx={{ width: 150 }}
        />
      </div>
    </LocalizationProvider>
  );
};

export default DateSelection;
