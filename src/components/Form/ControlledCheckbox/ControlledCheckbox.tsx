import { Controller, useFormContext } from 'react-hook-form';

// @mantine/core dependencies
import { Checkbox } from '@mantine/core';

// Local dependencies
import type { ControlledCheckboxProps } from './types';

export const ControlledCheckbox = (props: ControlledCheckboxProps) => {
  const { error, name } = props;

  /* react-hook-form */
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Checkbox error={error?.message} {...props} {...field} />
      )}
    />
  );
};
