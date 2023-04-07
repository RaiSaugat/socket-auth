/* eslint-disable fp/no-mutation */
import axios from 'axios';
import { getToken } from '../services/requestToken';
import { handleAxiosError } from './handleAxiosError';
import { handleAxiosResponse } from './handleAxiosSuccess';
import { getBaseApi } from '@/utils/helper';

class AxiosService {
  http: any;
  httpWithToken: any;
  constructor() {
    const httpConfig = {
      baseURL: getBaseApi(),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const http = axios.create(httpConfig);
    const httpWithToken = axios.create(httpConfig);

    http.interceptors.response.use(this.handleSuccess, this.handleError);

    httpWithToken.interceptors.response.use(
      this.handleSuccess,
      this.handleError
    );

    httpWithToken.interceptors.request.use(async (request: any) => {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');

      request.headers.Authorization = `Bearer ${userData.token}`;

      return request;
    });

    this.http = http;
    this.httpWithToken = httpWithToken;
  }

  handleSuccess(response: any) {
    return response;
  }

  handleError = (error: any) => {
    return Promise.reject(error);
  };

  get(url: string, hasToken?: boolean) {
    return (hasToken ? this.httpWithToken : this.http)
      .request({
        method: 'GET',
        url,
        responseType: 'json',
        cancelToken: getToken(url),
      })
      .then(handleAxiosResponse)
      .catch(handleAxiosError);
  }

  post(url: string, payload: {}, hasToken?: boolean) {
    return (hasToken ? this.httpWithToken : this.http)
      .request({
        method: 'POST',
        url,
        responseType: 'json',
        data: payload,
        cancelToken: getToken(url),
      })
      .then(handleAxiosResponse)
      .catch(handleAxiosError);
  }

  put(url: string, body: any, hasToken?: boolean) {
    return (hasToken ? this.httpWithToken : this.http)
      .request({
        method: 'PUT',
        url,
        responseType: 'json',
        data: body,
        cancelToken: getToken(url),
      })
      .then(handleAxiosResponse)
      .catch(handleAxiosError);
  }
}

export default new AxiosService();
