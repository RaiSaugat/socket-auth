import { AxiosResponse } from 'axios';

export async function handleAxiosResponse(
  response: AxiosResponse
): Promise<any> {
  try {
    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject('An error has occurred, please try again.');
  }
}
