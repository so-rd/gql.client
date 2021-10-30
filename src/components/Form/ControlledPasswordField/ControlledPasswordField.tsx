import { Controller, useFormContext } from 'react-hook-form';

// @mantine/core dependencies
import { PasswordInput } from '@mantine/core';

// Local dependencies
import type { PasswordFieldProps } from './types';

export const ControlledPasswordField = (props: PasswordFieldProps) => {
  const { className = '', error, name } = props;

  /* react-hook-form */
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <PasswordInput
          className={className}
          id={name}
          size="sm"
          variant="default"
          error={error?.message}
          {...props}
          {...field}
        />
      )}
    />
  );
};
