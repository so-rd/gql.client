import { Controller, useFormContext } from 'react-hook-form';

// @mui/material dependencies
import MUITextField from '@mui/material/TextField';

// Local dependencies
import type { TextFieldProps } from './types';

export const ControlledTextField = (props: TextFieldProps) => {
  const {
    className = '',
    name,
    label,
    type = 'text',
    disabled = false,
    required = false,
    error,
    multiline = false,
    rows,
  } = props;

  /* react-hook-form */
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MUITextField
          className={className}
          margin="dense"
          id={name}
          label={label}
          type={type}
          variant="outlined"
          size="small"
          fullWidth
          error={!!error}
          helperText={error}
          disabled={disabled}
          required={required}
          multiline={multiline}
          rows={rows}
          {...field}
        />
      )}
    />
  );
};
