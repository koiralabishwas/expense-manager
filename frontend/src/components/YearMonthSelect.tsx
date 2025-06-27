"use client";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function YearMonthSelect() {
  const router = useRouter();

  const now = new Date();

  const currentYear = now.getFullYear();
  const currentMonth = (now.getMonth() + 1).toString().padStart(2, "0");
  const yearMonthOptions = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, "0");
    return `${currentYear}${month}`;
  });

  const searchParams = useSearchParams();

  const selectedYearMonth =
    searchParams.get("yearMonth") || `${currentYear}${currentMonth}`;

  const handleChange = (event: SelectChangeEvent) => {
    const newYM = event.target.value;
    const params = new URLSearchParams(searchParams);
    params.set("yearMonth", newYM);
    window.location.search = params.toString();
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="yearMonth-label">年月</InputLabel>
        <Select
          labelId="yearMonth-label"
          id="yearMonth"
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
