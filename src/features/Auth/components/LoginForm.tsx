import { Link } from 'react-router-dom';

// local dependencies
import { Form, ControlledTextField } from 'src/components/Form';
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
              label="Email Address"
              error={formState.errors.email}
            />
            <ControlledTextField
              name="password"
              type="password"
              label="Password"
              error={formState.errors.password}
            />
            <div>
              <button disabled={isLoggingIn} type="submit" className="w-full">
                Log in
              </button>
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
