import React from 'react';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, TextFieldProps } from '../../atoms/TextField';

export type SearchBarProps = TextFieldProps;

export const SearchBar: React.FC<SearchBarProps> = (props) => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      {...props}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        ...props.InputProps,
      }}
    />
  );
};

export default SearchBar;
