/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ComponentProps } from 'react';
import userEvent from '@testing-library/user-event';

// local dependencies
import { render } from 'src/tests/test-utils';
import { ControlledCheckbox } from './ControlledCheckbox';

type Props = ComponentProps<typeof ControlledCheckbox>;

const defaultComponentProps: Props = {
  name: 'DefaultControlledCheckbox',
  label: 'Default controlled checkbox',
};

const getComponent = async (props: Props) => {
  const { getByLabelText } = await render(<ControlledCheckbox {...props} />, {
    DefaultControlledCheckbox: false,
  });
  const controlledCheckbox = getByLabelText(/default controlled checkbox/i);
  return { controlledCheckbox };
};

describe('<ControlledCheckbox />', () => {
  test('should refelct default values given our defaults', async () => {
    // arrange
    const { controlledCheckbox } = await getComponent(defaultComponentProps);

    // assert
    expect(controlledCheckbox).not.toBeChecked();
    expect(controlledCheckbox).not.toBeDisabled();
    expect(controlledCheckbox).not.toBeRequired();
  });

  test('should reflect custom values given custom props', async () => {
    // arrange
    const { controlledCheckbox } = await getComponent({
      ...defaultComponentProps,
      disabled: true,
      required: true,
    });

    // assert
    expect(controlledCheckbox).not.toBeChecked();
    expect(controlledCheckbox).toBeDisabled();
    expect(controlledCheckbox).toBeRequired();
  });

  test('should toggle the checkbox value based on user input', async () => {
    // arrange
    const { controlledCheckbox } = await getComponent(defaultComponentProps);

    // act
    userEvent.click(controlledCheckbox);

    // assert
    expect(controlledCheckbox).toBeChecked();
  });
});
