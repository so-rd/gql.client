import userEvent from '@testing-library/user-event';
import { z } from 'zod';

// @mui dependencies
import Button from '@mui/material/Button';

// local dependencies
import { render, waitFor } from 'src/tests/test-utils';
import { ControlledTextField } from './';
import { Form } from './Form';

const testData = {
  title: 'Hello World',
};
const handleSubmit = jest.fn();

const schema = z.object({
  title: z.string().min(1, 'Required'),
});

const getComponent = async () => {
  const { getByLabelText, getByRole } = await render(
    <Form<typeof testData, typeof schema>
      onSubmit={handleSubmit}
      schema={schema}
      options={{
        defaultValues: {
          title: '',
        },
      }}
      id="my-form"
    >
      {({ formState }) => (
        <>
          <ControlledTextField
            name="title"
            label="Title"
            error={formState.errors.title}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </>
      )}
    </Form>,
  );
  const titleInput = getByLabelText(/title/i);
  const submitButton = getByRole('button', {
    name: /submit/i,
  });

  return { titleInput, submitButton };
};

describe('<Form />', () => {
  test('should render and submit a basic Form component', async () => {
    // arrange
    const { titleInput, submitButton } = await getComponent();

    // act
    userEvent.type(titleInput, testData.title);
    userEvent.click(submitButton);

    // assert
    await waitFor(() => {
      expect(titleInput).toBeValid();
      expect(handleSubmit).toHaveBeenCalledWith(testData, expect.anything());
    });
  });
  // test('should fail submission if validation fails', async () => {
  //   // arrange
  //   const { titleInput, submitButton } = await getComponent();

  //   // act
  //   userEvent.clear(titleInput);
  //   userEvent.click(submitButton);

  //   await waitFor(() => {
  //     expect(titleInput).toBeInvalid();

  //     expect(handleSubmit).toHaveBeenCalledTimes(0);
  //   });
  // });
});
