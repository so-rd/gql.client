import type { FieldError } from 'react-hook-form';
import type { NativeSelectProps } from '@mantine/core';

export type DropdownProps = {
  className?: string;
  name: string;
  error?: FieldError | undefined;
} & NativeSelectProps;
