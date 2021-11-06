import Axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

// local dependencies
import { API_URL } from 'src/config/API_URL';
import storage from 'src/common/storage';
import { snackbarStore } from 'src/components/GlobalSnackbar/snackbarState';

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken();
  if (token) {
    // eslint-disable-next-line no-param-reassign
    (config.headers as AxiosRequestHeaders).authorization = `Bearer ${token}`;
  }
  // eslint-disable-next-line no-param-reassign
  (config.headers as AxiosRequestHeaders).Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  ({ data: { data, errors } }) => {
    if (errors) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      errors.forEach(({ message, extensions: { code } }) => {
        snackbarStore.setState({
          color: 'red',
          title: code,
          message,
          autoClose: 7500,
        });
      });

      return Promise.reject(errors);
    }
    return data;
  },
  (error) => {
    const title = error.response?.data?.title || error.message;
    const message = error.response?.data?.errors[0].message || error.message;

    snackbarStore.setState({
      color: 'red',
      title,
      message,
      autoClose: 7500,
    });

    return Promise.reject(error);
  },
);
