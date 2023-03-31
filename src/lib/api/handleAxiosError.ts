import { AxiosError } from 'axios';

export async function handleAxiosError(error: AxiosError<any>): Promise<any> {
  if (error?.response && error?.response?.status >= 400) {
    console.log('sdf ', error);
    const message =
      error?.response?.statusText ?? 'An error has occurred, please try again.';

    return error?.response?.data
      ? Promise.reject(error?.response?.data)
      : Promise.reject(message);
  }
}
