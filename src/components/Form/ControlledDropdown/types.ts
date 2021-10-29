import type { FieldError } from 'react-hook-form';

export type DropdownProps = {
  className?: string;
  name: string;
  label: string;
  options: { name: string; value: any }[];
  disabled?: boolean;
  required?: boolean;
  handleChange?: (arg: any) => void;
  error?: FieldError | undefined;
};
