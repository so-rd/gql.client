import type { FieldError } from 'react-hook-form';

export type TextFieldProps = {
  className?: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  disabled?: boolean;
  required?: boolean;
  error?: FieldError | undefined;
  multiline?: boolean;
  rows?: number;
};
