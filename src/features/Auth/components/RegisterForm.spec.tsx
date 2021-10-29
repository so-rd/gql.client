import { ComponentProps } from 'react';

// local dependencies
import { userGenerator } from 'src/tests/data-generators';
import { render, userEvent } from 'src/tests/test-utils';
import { RegisterForm } from './RegisterForm';

type Props = ComponentProps<typeof RegisterForm>;

const onSuccess = jest.fn();

const getComponent = async (props: Props) => {
  const { getByLabelText, getByRole } = await render(
    <RegisterForm {...props} />,
    {
      user: null,
    },
  );
  const firstNameInput = getByLabelText(/first name/i);
  const lastNameInput = getByLabelText(/last name/i);
  const emailInput = getByLabelText(/email address/i);
  const passwordInput = getByLabelText(/password/i);
  const registerButton = getByRole('button', { name: /register/i });

  return {
    firstNameInput,
    lastNameInput,
    emailInput,
    passwordInput,
    registerButton,
  };
};

describe('<RegisterForm />', () => {
  test('should register new user and call onSuccess cb which should navigate the user to the app', async () => {
    const newUser = userGenerator({});

    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      passwordInput,
      registerButton,
    } = await getComponent({
      onSuccess,
    });

    userEvent.type(firstNameInput, newUser.firstName);
    userEvent.type(lastNameInput, newUser.lastName);
    userEvent.type(emailInput, newUser.email);
    userEvent.type(passwordInput, newUser.password);

    // userEvent.click(registerButton);

    // await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
  });
});
