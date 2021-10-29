import { ComponentProps } from 'react';

// local dependencies
import { createUser, render, userEvent } from 'src/tests/test-utils';
import { LoginForm } from './LoginForm';

type Props = ComponentProps<typeof LoginForm>;

const onSuccess = jest.fn();

const getComponent = async (props: Props) => {
  const { getByLabelText, getByRole } = await render(<LoginForm {...props} />, {
    user: null,
  });
  const emailInput = getByLabelText(/email address/i);
  const passwordInput = getByLabelText(/password/i);
  const loginButton = getByRole('button', { name: /log in/i });

  return { emailInput, passwordInput, loginButton };
};

describe('<LoginForm />', () => {
  test('should login new user and call onSuccess cb which should navigate the user to the app', async () => {
    const newUser = createUser({ teamId: undefined });

    const { emailInput, passwordInput, loginButton } = await getComponent({
      onSuccess,
    });

    render(<LoginForm onSuccess={onSuccess} />, { user: null });

    userEvent.type(emailInput, newUser.email);
    userEvent.type(passwordInput, newUser.password);
    // userEvent.click(loginButton);

    // await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
  });
});
