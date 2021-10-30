import type { FieldError } from 'react-hook-form';
import type { PasswordInputProps } from '@mantine/core';

export type PasswordFieldProps = {
  className?: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  disabled?: boolean;
  required?: boolean;
  error?: FieldError | undefined;
} & PasswordInputProps;
