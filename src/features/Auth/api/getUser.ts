// local dependencies
import { axios } from 'src/lib/app-axios';
import type { AuthUser } from '../types/AuthUser';

const UserFieldsFragmentDoc = `
  fragment UserFields on User {
    _id
    email
    firstName
    lastName
    bio
    role
  }
`;
const query = `
  query me {
    me {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;

export const getUser = (): Promise<{ me: AuthUser }> => {
  return axios.post('/graphql', { query });
};
