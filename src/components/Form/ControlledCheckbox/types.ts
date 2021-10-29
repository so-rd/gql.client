import type { FieldError } from 'react-hook-form';

export type ControlledCheckboxProps = {
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  error?: FieldError | undefined;
};
