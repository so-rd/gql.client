// local dependencies
import { axios } from 'src/lib/app-axios';
import type { UserResponse } from '../types/UserResponse';
import type { LoginMutationVariables } from '../types/LoginMutationVariables';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

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
  mutation login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      user {
        ...UserFields
      }
      jwt
    }
  }
  ${UserFieldsFragmentDoc}
`;

export const loginWithEmailAndPassword = (
  variables: LoginMutationVariables,
): Promise<{ login: UserResponse }> => {
  return axios.post('/graphql', { query, variables });
};
