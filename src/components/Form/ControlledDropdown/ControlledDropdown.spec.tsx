import { ComponentProps } from 'react';
import userEvent from '@testing-library/user-event';

// local dependencies
import { render, waitFor } from 'src/tests/test-utils';
import { ControlledDropdown } from './ControlledDropdown';

type Props = ComponentProps<typeof ControlledDropdown>;

const emptyProps: Props = {
  name: 'EmptyControlledDropdown',
  label: 'default-controlled-dropdown',
  data: [],
};

const valueProps: Props = {
  name: 'ValuedControlledDropdown',
  label: 'default-controlled-dropdown',
  data: [
    { label: '', value: '' },
    { label: 'Test Dropdown Name', value: 'Test Dropdown Value' },
    {
      label: 'Test Dropdown Name  Changed',
      value: 'Test Dropdown Value Changed',
    },
  ],
};

const getComponent = async (props: Props) => {
  const { getByLabelText, queryAllByRole } = await render(
    <ControlledDropdown {...props} />,
    { EmptyControlledDropdown: '', ValuedControlledDropdown: '' },
  );
  const controlledInput = getByLabelText(/default-controlled-dropdown/i);
  const options = queryAllByRole('option');
  return { controlledInput, options };
};

describe('<ControlledDropdown />', () => {
  test('inputs should refelct default values given our defaults', async () => {
    // arrange
    const { controlledInput } = await getComponent(emptyProps);

    // assert
    expect(controlledInput).not.toHaveValue();
    expect(controlledInput).not.toBeDisabled();
    expect(controlledInput).not.toBeRequired();
  });

  test('inputs should refelct custom values', async () => {
    // arrange
    const { controlledInput } = await getComponent({
      ...valueProps,
      disabled: true,
      required: true,
    });

    // assert
    waitFor(() => {
      expect(controlledInput).toHaveValue('Test Dropdown Value');
      expect(controlledInput).toBeDisabled();
      expect(controlledInput).toBeRequired();
    });
  });

  test('input should successfully change state when another value is selected', async () => {
    // arrange
    const { controlledInput, options } = await getComponent({
      ...valueProps,
      disabled: true,
      required: true,
    });

    // act
    userEvent.click(controlledInput);

    waitFor(() => {
      userEvent.click(options[0]);
      // assert
      expect(controlledInput).toHaveValue('Test Dropdown Value Changed');
      // expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });
});
