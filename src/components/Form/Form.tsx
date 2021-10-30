import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { ReactNode } from 'react';
import {
  FormProvider,
  useForm,
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
} from 'react-hook-form';
import { ZodType, ZodTypeDef } from 'zod';

type FormProps<TFormValues, Schema> = {
  className?: string;
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
  schema?: Schema;
};

export const Form = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<
    unknown,
    ZodTypeDef,
    unknown
  >,
>({
  onSubmit,
  children,
  className,
  options,
  id,
  schema,
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema && zodResolver(schema),
  });
  // eslint-disable-next-line no-console
  // const onError = (errors: any) => console.error('Form errors :>>', errors);
  return (
    <FormProvider {...methods}>
      <form
        className={clsx('space-y-4', className)}
        onSubmit={methods.handleSubmit(onSubmit)}
        id={id}
      >
        {children(methods)}
      </form>
    </FormProvider>
  );
};
