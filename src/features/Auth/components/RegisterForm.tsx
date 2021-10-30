import { Link } from 'react-router-dom';

// @mantine/core dependencies
import { Button } from '@mantine/core';

// local dependencies
import { Form, ControlledTextField } from 'src/components/Form';
import { useAuth } from 'src/lib/auth';
import { registerFormSchema } from '../schemas/registerFormSchema';
import type { RegisterFormValues } from '../types/RegisterFormValues';

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { register, isRegistering } = useAuth();

  return (
    <div>
      <Form<RegisterFormValues, typeof registerFormSchema>
        onSubmit={async (values) => {
          await register(values);
          onSuccess();
        }}
        schema={registerFormSchema}
        options={{
          shouldUnregister: true,
          defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          },
        }}
      >
        {({ formState }) => (
          <>
            <ControlledTextField
              name="firstName"
              label="First name"
              required
              error={formState.errors.firstName}
            />
            <ControlledTextField
              name="lastName"
              label="Last name"
              required
              error={formState.errors.lastName}
            />
            <ControlledTextField
              name="email"
              type="email"
              label="Email address"
              required
              error={formState.errors.email}
            />
            <ControlledTextField
              name="password"
              type="password"
              label="Password"
              required
              error={formState.errors.password}
            />

            <Button
              type="submit"
              className="w-full mt-3"
              variant="outline"
              disabled={isRegistering}
            >
              Register
            </Button>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link
            to="../login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};
