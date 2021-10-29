import { rest } from 'msw';

import { API_URL } from 'src/config/API_URL';

import { requireAuth, delayedResponse } from '../utils';

export const usersHandlers = [
  rest.get(`${API_URL}/users/me`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);

      return delayedResponse(ctx.json(user));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' }),
      );
    }
  }),
];
