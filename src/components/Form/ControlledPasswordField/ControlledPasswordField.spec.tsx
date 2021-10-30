import { ComponentProps } from 'react';
import userEvent from '@testing-library/user-event';

// local dependencies
import { render } from 'src/tests/test-utils';
import { ControlledPasswordField } from './ControlledPasswordField';

type Props = ComponentProps<typeof ControlledPasswordField>;

const defaultComponentProps: Props = {
  name: 'DefaultControlledInput',
  label: 'Default controlled input',
};

const getComponent = async (props: Props) => {
  const { getByLabelText } = await render(
    <ControlledPasswordField {...props} />,
    {
      DefaultControlledInput: '',
    },
  );
  const controlledInput = getByLabelText(/default controlled input/i);
  return { controlledInput };
};

describe('<ControlledTextField />', () => {
  test('inputs should refelct default values given our defaults', async () => {
    // arrange
    const { controlledInput } = await getComponent(defaultComponentProps);

    // assert
    expect(controlledInput).toHaveValue('');
    expect(controlledInput).not.toBeDisabled();
    expect(controlledInput).not.toBeRequired();
  });

  test('should reflect custom values given custom props', async () => {
    // arrange
    const { controlledInput } = await getComponent({
      ...defaultComponentProps,
      disabled: true,
      required: true,
    });

    // assert
    expect(controlledInput).toHaveValue('');
    expect(controlledInput).toBeDisabled();
    expect(controlledInput).toBeRequired();
  });

  test('should update the input value based on user input', async () => {
    // arrange
    const { controlledInput } = await getComponent(defaultComponentProps);

    // act
    userEvent.type(controlledInput, 'absence');

    // assert
    expect(controlledInput).toHaveValue('absence');
  });
});
