import omit from 'lodash.omit';
import { RestRequest, createResponseComposition, context } from 'msw';

import { db } from './db';

const isTesting =
  process.env.NODE_ENV === 'test' || ((window as any).Cypress as any);

export const delayedResponse = createResponseComposition(undefined, [
  context.delay(isTesting ? 0 : 1000),
]);

export const sanitizeUser = (user: any) => omit(user, ['password', 'iat']);

export function authenticate({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = db.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });

  if (user?.password === password) {
    const sanitizedUser = sanitizeUser(user);
    const encodedToken = sanitizedUser.id;
    return { user: sanitizedUser, jwt: encodedToken };
  }

  const error = new Error('Invalid username or password');
  throw error;
}

export function requireAuth(request: RestRequest) {
  try {
    const encodedToken = request.headers.get('authorization');
    if (!encodedToken) {
      throw new Error('No authorization token provided!');
    }
    const decodedToken = encodedToken;

    const user = db.user.findFirst({
      where: {
        id: {
          equals: decodedToken,
        },
      },
    });

    if (!user) {
      throw Error('Unauthorized');
    }

    return sanitizeUser(user);
  } catch (err: any) {
    throw new Error(err);
  }
}

export function requireAdmin(user: any) {
  if (user.role !== 'ADMIN') {
    throw Error('Unauthorized');
  }
}
