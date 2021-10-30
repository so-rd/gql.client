import type { FieldError } from 'react-hook-form';
import type { TextInputProps } from '@mantine/core';

export type TextFieldProps = {
  className?: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  disabled?: boolean;
  required?: boolean;
  error?: FieldError | undefined;
} & TextInputProps;
