// local dependencies
import { axios } from 'src/lib/app-axios';
import type { UserResponse } from '../types/UserResponse';
import type { RegisterMutationVariables } from '../types/RegisterMutationVariables';

const UserFieldsFragmentDoc = `
  fragment UserFields on User {
    _id
    email
    firstName
    lastName
    bio
    role
    dateCreated
    dateUpdated
  }
`;
const query = `
  mutation register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      user {
        ...UserFields
      }
      jwt
    }
  }
  ${UserFieldsFragmentDoc}
`;

export const registerWithEmailAndPassword = (
  variables: RegisterMutationVariables,
): Promise<{ register: UserResponse }> => {
  return axios.post('/graphql', { query, variables });
};
