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
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;

    console.log(`axios error :>>`, error);

    snackbarStore.setState({
      color: 'red',
      title: error.response?.data?.errorType as string,
      message,
    });

    return Promise.reject(error);
  },
);
