// local dependencies
import { axios } from 'src/lib/app-axios';
import type { AuthUser } from '../types/AuthUser';

export const getUser = (): Promise<AuthUser> => {
  return axios.get('/users/me');
};
