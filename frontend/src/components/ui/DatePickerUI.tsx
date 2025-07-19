import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTime } from 'luxon';
import { TextField } from '@mui/material';

interface Props {
  value: DateTime | null;
  onChange: (date: DateTime | null) => void;
  label?: string;
  error?: boolean;
  helperText?: React.ReactNode;
}

export default function DatePickerUI({ value, onChange, label, error, helperText }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
        label={label ?? "日付"}
        value={value}
        onChange={onChange}
        format="yyyy/MM/dd"
        slotProps={{
          textField: {
            fullWidth: true,
            margin: "normal",
            error,
            helperText,
          },
        }}
      />
    </LocalizationProvider>
  );
}
