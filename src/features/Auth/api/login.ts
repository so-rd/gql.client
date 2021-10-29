// local dependencies
import { axios } from 'src/lib/app-axios';
import type { UserResponse } from '../types/UserResponse';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = (
  data: LoginCredentialsDTO,
): Promise<UserResponse> => {
  return axios.post('/auth/login', data);
};
