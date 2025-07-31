"use client";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useId, useMemo } from "react";

export default function YearMonthSelect() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = (now.getMonth() + 1).toString().padStart(2, "0");
  const baseDate = new Date(currentYear, now.getMonth(), 1); // 1st day of current month

  const yearMonthOptions = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date(baseDate);
      date.setMonth(baseDate.getMonth() - 6 + i);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      return `${year}${month}`;
    });
  }, [baseDate]);

  const searchParams = useSearchParams();
  const selectedYearMonth =
    searchParams.get("yearMonth") || `${currentYear}${currentMonth}`;

  const handleChange = (event: SelectChangeEvent) => {
    const newYM = event.target.value;
    const params = new URLSearchParams(searchParams);
    params.set("yearMonth", newYM);
    window.location.search = params.toString();
  };

  const id = useId();

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel >年月</InputLabel>
        <Select
          id={id}
          value={selectedYearMonth}
          label="年月"
          onChange={handleChange}
        >
          {yearMonthOptions.map((ym) => (
            <MenuItem key={ym} value={ym}>
              {ym.slice(0, 4)}年{ym.slice(4)}月
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
