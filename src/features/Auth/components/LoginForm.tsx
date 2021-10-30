import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

// local dependencies
import {
  Form,
  ControlledPasswordField,
  ControlledTextField,
} from 'src/components/Form';
import { useAuth } from 'src/lib/auth';
import { loginFormSchema } from '../schemas/loginFormSchema';
import type { LoginFormValues } from '../types/LoginFormValues';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login, isLoggingIn } = useAuth();

  return (
    <div>
      <Form<LoginFormValues, typeof loginFormSchema>
        onSubmit={async (values) => {
          await login(values);
          onSuccess();
        }}
        schema={loginFormSchema}
        options={{
          defaultValues: {
            email: '',
            password: '',
          },
        }}
      >
        {({ formState }) => (
          <>
            <ControlledTextField
              name="email"
              type="email"
              label="Email address"
              required
              error={formState.errors.email}
            />
            <ControlledPasswordField
              name="password"
              type="password"
              label="Password"
              required
              error={formState.errors.password}
            />
            <div>
              <Button
                type="submit"
                className="w-full mt-3"
                variant="outline"
                disabled={isLoggingIn}
              >
                Log in
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link
            to="../register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
