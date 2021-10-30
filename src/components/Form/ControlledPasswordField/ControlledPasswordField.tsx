import { Controller, useFormContext } from 'react-hook-form';

// @mantine/core dependencies
import { PasswordInput } from '@mantine/core';

// @mui/material dependencies
import MUITextField from '@mui/material/TextField';

// Local dependencies
import type { TextFieldProps } from './types';

export const ControlledPasswordField = (props: TextFieldProps) => {
  const { className = '', error, name } = props;

  /* react-hook-form */
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <PasswordInput
          {...props}
          className={className}
          id={name}
          size="sm"
          error={error?.message}
          {...field}
        />
      )}
    />
  );
};
