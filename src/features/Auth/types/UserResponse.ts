import type { AuthUser } from './AuthUser';

export type UserResponse = {
  jwt: string;
  user: AuthUser;
};
