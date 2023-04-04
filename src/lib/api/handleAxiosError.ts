import { AxiosError } from 'axios';

export async function handleAxiosError(error: AxiosError<any>): Promise<any> {
  if (error?.response && error?.response?.status >= 400) {
    return Promise.reject(error?.response?.data);
  }
}
