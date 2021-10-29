// local dependencies
import { axios } from 'src/lib/app-axios';
import type { UserResponse } from '../types/UserResponse';

export type RegisterCredentialsDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const registerWithEmailAndPassword = (
  data: RegisterCredentialsDTO,
): Promise<UserResponse> => {
  return axios.post('/auth/register', data);
};
