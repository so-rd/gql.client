import { Controller, useFormContext } from 'react-hook-form';
import cuid from 'cuid';

// @mui/material dependencies
import { NativeSelect } from '@mantine/core';

// Local dependencies
import type { DropdownProps } from './types';

export const ControlledDropdown = (props: DropdownProps) => {
  const { name, className, error } = props;

  /* react-hook-form */
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <NativeSelect
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
