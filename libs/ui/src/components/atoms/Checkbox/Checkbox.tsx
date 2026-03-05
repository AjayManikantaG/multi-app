import React from 'react';
import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabel,
  FormControlLabelProps,
} from '@mui/material';

export interface CheckboxProps extends MuiCheckboxProps {
  label?: React.ReactNode;
  formControlLabelProps?: Omit<FormControlLabelProps, 'control' | 'label'>;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  formControlLabelProps,
  ...props
}) => {
  const checkboxControl = <MuiCheckbox {...props} />;

  if (label) {
    return (
      <FormControlLabel
        control={checkboxControl}
        label={label}
        {...formControlLabelProps}
      />
    );
  }

  return checkboxControl;
};

export default Checkbox;
