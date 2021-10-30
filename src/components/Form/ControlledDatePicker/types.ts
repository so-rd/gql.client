import type { FieldError } from 'react-hook-form';
import { DatePickerProps } from '@mantine/dates';

export type ControlledDatePickerProps = {
  className?: string;
  name: string;
  label: string;
  defaultValue?: string | Date | null;
  disabled?: boolean;
  error?: FieldError | undefined;
} & DatePickerProps;
