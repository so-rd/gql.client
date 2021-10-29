import { primaryKey } from '@mswjs/data';

export const user = {
  id: primaryKey(String),
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  teamId: String,
  role: String,
  bio: String,
  dateCreated: String,
};
