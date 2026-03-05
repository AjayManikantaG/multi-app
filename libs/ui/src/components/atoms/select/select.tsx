'use client';

import React from 'react';
import {
  Select as MuiSelect,
  MenuItem,
  FormControl,
  InputLabel,
  SelectProps,
} from '@mui/material';

type CustomSelectProps = SelectProps & {
  label: string;
  options: { label: string; value: string | number }[];
};

export const Select: React.FC<CustomSelectProps> = ({
  label,
  options,
  ...props
}) => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} {...props}>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
