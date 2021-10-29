import { Controller, useFormContext } from 'react-hook-form';

// @mui/material dependencies
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// Local dependencies
import type { ControlledCheckboxProps } from './types';

export const ControlledCheckbox = (props: ControlledCheckboxProps) => {
  const { name, label, disabled = false, required = false } = props;

  /* react-hook-form */
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              id={name}
              required={required}
              checked={field.value}
              {...field}
            />
          }
          disabled={disabled}
          label={label}
        />
      )}
    />
  );
};
