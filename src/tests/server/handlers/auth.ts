import cuid from 'cuid';
import { rest } from 'msw';

import { API_URL } from 'src/config/API_URL';

import { db, persistDb } from '../db';
import { authenticate, delayedResponse } from '../utils';

type RegisterBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  teamId?: string;
  teamName?: string;
};

type LoginBody = {
  email: string;
  password: string;
};

export const authHandlers = [
  rest.post<RegisterBody>(`${API_URL}/auth/register`, (req, res, ctx) => {
    try {
      const userObject = req.body;

      const existingUser = db.user.findFirst({
        where: {
          email: {
            equals: userObject.email,
          },
        },
      });

      if (existingUser) {
        throw new Error('The user already exists');
      }

      let teamId: string;
      let role: string;

      if (!userObject.teamId) {
        const team = db.team.create({
          id: cuid(),
          name: userObject.teamName ?? `${userObject.firstName} Team`,
          dateCreated: new Date().toISOString(),
        });
        persistDb('team');
        teamId = team.id;
        role = 'ADMIN';
      } else {
        const existingTeam = db.team.findFirst({
          where: {
            id: {
              equals: userObject.teamId,
            },
          },
        });

        if (!existingTeam) {
          throw new Error('The team you are trying to join does not exist!');
        }
        teamId = userObject.teamId;
        role = 'USER';
      }

      db.user.create({
        ...userObject,
        id: cuid(),
        dateCreated: new Date().toISOString(),
        role,
        password: userObject.password,
        teamId,
      });

      persistDb('user');

      const result = authenticate({
        email: userObject.email,
        password: userObject.password,
      });

      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' }),
      );
    }
  }),

  rest.post<LoginBody>(`${API_URL}/auth/login`, (req, res, ctx) => {
    try {
      const credentials = req.body;
      const result = authenticate(credentials);
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' }),
      );
    }
  }),
];
