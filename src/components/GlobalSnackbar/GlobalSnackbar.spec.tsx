import { render } from 'src/tests/test-utils';
import { GlobalSnackbar } from './GlobalSnackbar';

const getComponent = async () => {
  return render(<GlobalSnackbar />, null);
};

describe('<GlobalSnackbar />', () => {
  test('it displays the default title and children', async () => {
    // arrange
    const { queryByTestId } = await getComponent();
    const snackbar = queryByTestId('global-snack-bar');

    expect(snackbar).not.toBeInTheDocument();
  });
});
