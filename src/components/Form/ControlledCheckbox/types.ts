import type { FieldError } from 'react-hook-form';
import type { CheckboxProps } from '@mantine/core';

export type ControlledCheckboxProps = {
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  error?: FieldError | undefined;
} & CheckboxProps;
