import { primaryKey } from '@mswjs/data';

export const team = {
  id: primaryKey(String),
  name: String,
  description: String,
  dateCreated: String,
};
