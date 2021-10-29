import { Controller, useFormContext } from 'react-hook-form';

// @mui dependencies
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';

// Local dependencies
import type { ControlledDatePickerProps } from './types';

export const ControlledDatePicker = (props: ControlledDatePickerProps) => {
  const {
    className = '',
    name,
    label,
    disabled = false,
    required = false,
    error,
  } = props;

  /* react-hook-form */
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...rest } }) => (
        <DatePicker
          {...rest}
          aria-label={`${name} holiday select`}
          inputFormat="MM/dd/yyyy"
          InputAdornmentProps={{ position: 'start' }}
          disabled={disabled}
          renderInput={(renderInputProps) => (
            <TextField
              {...renderInputProps}
              className={className}
              size="small"
              label={label}
              id={name}
              disabled={disabled}
              required={required}
              error={!!error}
              helperText={error?.message ? error?.message : null}
              fullWidth
            />
          )}
        />
      )}
    />
  );
};
