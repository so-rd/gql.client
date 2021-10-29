import type { FieldError } from 'react-hook-form';

export type ControlledDatePickerProps = {
  className?: string;
  name: string;
  label: string;
  defaultValue?: string | Date | null;
  disabled?: boolean;
  required?: boolean;
  error?: FieldError | undefined;
};
