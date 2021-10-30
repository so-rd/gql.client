import { Controller, useFormContext } from 'react-hook-form';

// @mantine/dates dependencies
import { DatePicker } from '@mantine/dates';

// Local dependencies
import type { ControlledDatePickerProps } from './types';

export const ControlledDatePicker = (props: ControlledDatePickerProps) => {
  const { name, error } = props;

  /* react-hook-form */
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...rest } }) => (
        <DatePicker
          error={error?.message}
          variant="default"
          inputFormat="MM/dd/yyyy"
          {...props}
          {...rest}
        />
      )}
    />
  );
};
