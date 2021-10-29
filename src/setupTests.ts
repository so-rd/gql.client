/* eslint-disable */

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
require('@testing-library/jest-dom/extend-expect');
require('@testing-library/jest-dom');
require('jest-axe/extend-expect');

import { queryClient } from 'src/lib/app-react-query';
// import { resetDb } from 'src/tests/server/db';
// import { server } from 'src/tests/server/server';

// beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
// afterAll(() => server.close());
// afterEach(() => server.resetHandlers());

// general cleanup
afterEach(async () => {
  queryClient.clear();
  //   resetDb();
});

const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
