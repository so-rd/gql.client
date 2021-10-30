import { Controller, useFormContext } from 'react-hook-form';

// @mantine/core dependencies
import { TextInput } from '@mantine/core';

// Local dependencies
import type { TextFieldProps } from './types';

export const ControlledTextField = (props: TextFieldProps) => {
  const { className = '', error, name } = props;

  /* react-hook-form */
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextInput
          {...props}
          className={className}
          id={name}
          size="sm"
          variant="default"
          error={error?.message}
          {...field}
        />
      )}
    />
  );
};
