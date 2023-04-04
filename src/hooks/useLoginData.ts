import { useMutation } from 'react-query';

import axiosService from '@/lib/api/axiosService';
import { AxiosResponse } from 'axios';

const login = async (data: { email: string; password: string }) => {
  return await axiosService.post(`/api/v1/login`, data);
};

export const useLogin = (onSuccess?: any, onError?: any) => {
  return useMutation('login', login, {
    onSuccess: (data: AxiosResponse) => {
      onSuccess(data.data);
    },
    onError: (
      error: { message: string } | { field: string; message: string }[]
    ) => {
      onError(error);
    },
  });
};
