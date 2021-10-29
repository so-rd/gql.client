import { ComponentProps } from 'react';
import userEvent from '@testing-library/user-event';
import { format } from 'date-fns';

// local dependencies
import { render, waitFor } from 'src/tests/test-utils';
import { ControlledDatePicker } from './ControlledDatePicker';

type Props = ComponentProps<typeof ControlledDatePicker>;

const defaultComponentProps: Props = {
  name: 'DefaultControlledDatePicker',
  label: 'Default controlled datepicker',
};

const defaultDate = new Date();

const getComponent = async (props: Props, defaultFormValue?: any) => {
  const { getByLabelText, queryByText } = await render(
    <ControlledDatePicker {...props} />,
    {
      DefaultControlledDatePicker: defaultFormValue,
    },
  );
  const controlledDatePicker = getByLabelText(/default controlled datepicker/i);
  const inputError = queryByText(/invalid input/i);
  return { controlledDatePicker, inputError };
};

describe('<ControlledDatePicker />', () => {
  test('should refelct default values given our defaults', async () => {
    // arrange
    const { controlledDatePicker, inputError } = await getComponent(
      defaultComponentProps,
    );

    // assert
    expect(controlledDatePicker).not.toBeDisabled();
    expect(controlledDatePicker).not.toBeRequired();
    expect(inputError).not.toBeInTheDocument();
  });

  test('should reflect custom values given custom props', async () => {
    // arrange
    const { controlledDatePicker } = await getComponent({
      ...defaultComponentProps,
      disabled: true,
      required: true,
    });

    // assert
    expect(controlledDatePicker).toBeDisabled();
    expect(controlledDatePicker).toBeRequired();
  });

  test('should reflect the default value when given', async () => {
    // arrange
    const { controlledDatePicker } = await getComponent(
      defaultComponentProps,
      defaultDate,
    );

    // assert
    expect(controlledDatePicker).toHaveValue(format(defaultDate, 'MM/dd/yyyy'));
  });

  test('should mask forward slashes given user input', async () => {
    // arrange
    const { controlledDatePicker } = await getComponent(defaultComponentProps);

    // act
    userEvent.type(controlledDatePicker, '09/08/2021');

    // assert
    waitFor(() => {
      expect(controlledDatePicker).toHaveValue('09/08/2021');
    });
  });

  test('should change the value given user input (without default value)', async () => {
    // arrange
    const { controlledDatePicker } = await getComponent(defaultComponentProps);

    // act
    userEvent.type(controlledDatePicker, '09082021');

    // assert
    waitFor(() => {
      expect(controlledDatePicker).toHaveValue('09/08/2021');
    });
  });

  test('should change the value given user input (with default value)', async () => {
    // arrange
    const { controlledDatePicker } = await getComponent(
      defaultComponentProps,
      '2021-09-09T17:40:53.724Z',
    );

    // act
    userEvent.type(controlledDatePicker, `${'{backspace}'.repeat(2)}34`);

    // assert
    waitFor(() => {
      expect(controlledDatePicker).toHaveValue('09/08/2034');
    });
  });

  test('should invalidate and display error when error is passsed in', async () => {
    // arrange
    const { controlledDatePicker, inputError } = await getComponent(
      {
        ...defaultComponentProps,
        error: { type: 'error', message: 'invalid input' },
      },
      defaultDate,
    );

    // assert
    expect(inputError).toBeInTheDocument();
    expect(controlledDatePicker).toBeInvalid();
  });
});
