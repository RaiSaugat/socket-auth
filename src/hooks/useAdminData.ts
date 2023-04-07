import { useMutation } from 'react-query';

import axiosService from '@/lib/api/axiosService';

type UserDTO = {
  email: string;
  username: string;
  password?: string;
  updateEmail: boolean;
};

const updateAdminProfile = async ({
  email,
  username,
  password,
  updateEmail,
}: UserDTO) => {
  const payload: UserDTO = {
    email,
    username,
    updateEmail,
  };

  if (password) {
    payload.password = password;
  }

  return await axiosService
    .put(`/api/v1/user`, payload, true)
    .then((response: any) => response.data);
};

const updateToken = async (tokenId: string) => {
  return await axiosService
    .put(`/api/v1/token/${tokenId}`, {}, true)
    .then((response: any) => response.data);
};

const generateToken = async () => {
  return await axiosService
    .get(`/api/v1/generate-token`, true)
    .then((response: any) => response.data);
};

const createUser = async (data: {
  email: string;
  password: string;
  type: 'USER' | 'ADMIN';
  username: string;
}) => {
  return await axiosService.post(`/api/v1/signup`, data);
};

export const useUpdateAdminProfile = (onSuccess?: any, onError?: any) => {
  return useMutation(updateAdminProfile, {
    onSuccess,
    onError: (
      error: string | { message: string } | { field: string; message: string }[]
    ) => {
      onError(error);
    },
  });
};

// use when you want to update the token
export const useUpdateToken = (onSuccess?: any, onError?: any) => {
  return useMutation(updateToken, {
    retry: false,
    onSuccess,
    onError,
  });
};

// use when you want to create the token
export const useGenerateToken = (onSuccess?: any, onError?: any) => {
  return useMutation('generateToken', generateToken, {
    retry: false,
    onSuccess,
    onError,
  });
};

// use when you want to create the user
export const useCreateUser = (onSuccess?: any, onError?: any) => {
  return useMutation('createUser', createUser, {
    onSuccess,
    onError: (
      error: string | { message: string } | { field: string; message: string }[]
    ) => {
      onError(error);
    },
  });
};
