export type AuthUser = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  role: 'ADMIN' | 'USER';
};
