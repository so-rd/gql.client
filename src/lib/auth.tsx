import { initReactQueryAuth } from 'react-query-auth';

import {
  loginWithEmailAndPassword,
  getUser,
  registerWithEmailAndPassword,
  UserResponse,
  LoginCredentialsDTO,
  RegisterInput,
  AuthUser,
  LoginInput,
} from 'src/features/Auth';
import storage from 'src/common/storage';

async function handleUserResponse(data: UserResponse) {
  const { jwt, user } = data;
  storage.setToken(jwt);
  return user;
}

async function loadUser() {
  if (storage.getToken()) {
    const { me } = await getUser();
    return me;
  }
  return null;
}

async function loginFn(variables: LoginInput) {
  const { login } = await loginWithEmailAndPassword({ loginInput: variables });
  const user = await handleUserResponse(login);
  return user;
}

async function registerFn(variables: RegisterInput) {
  const { register } = await registerWithEmailAndPassword({
    registerInput: variables,
  });
  const user = await handleUserResponse(register);
  return user;
}

async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return <p>L O A D I N G . . .</p>;
  },
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
  AuthUser | null,
  unknown,
  LoginCredentialsDTO,
  RegisterInput
>(authConfig);
