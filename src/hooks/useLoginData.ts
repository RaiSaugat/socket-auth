import axios, { AxiosError } from 'axios';
import { useMutation } from 'react-query';

const login = async (data: { email: string; password: string }) => {
  return axios({
    method: 'POST',
    url: 'http://localhost:3001/login',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  }).then((res) => res.data);
};
export const useLogin = (onSuccess?: any, onError?: any) => {
  return useMutation('login', login, {
    onSuccess: onSuccess,
    onError: (error: AxiosError) => {
      if (error instanceof AxiosError) {
        onError(error.response?.data || 'Something went wrong');
      }
    },
  });
};
