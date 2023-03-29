import axios, { AxiosError } from 'axios';
import { useMutation } from 'react-query';

const userData = JSON.parse(localStorage.getItem('userData') || '{}');

const updateAdminProfile = ({
  email,
  username,
}: {
  username: string;
  email: string;
}) => {
  return axios({
    method: 'PUT',
    url: 'http://localhost:3001/user',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`,
    },
    data: {
      email,
      username,
    },
  }).then((response) => response.data);
};

const updateToken = (tokenId: string) => {
  return axios({
    method: 'PUT',
    url: `http://localhost:3001/token/${tokenId}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userData.token,
    },
    data: {
      tokenId,
    },
  }).then((response) => response.data);
};

const generateToken = () => {
  return axios({
    method: 'GET',
    url: `http://localhost:3001/generate-token`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userData.token,
    },
  }).then((response) => response.data);
};

const createUser = (data: {
  email: string;
  password: string;
  type: 'USER' | 'ADMIN';
  username: string;
}) => {
  return axios({
    method: 'POST',
    url: 'http://localhost:3001/signup',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  }).then((response) => response.data);
};

export const useUpdateAdminProfile = (onSuccess?: any, onError?: any) => {
  return useMutation(updateAdminProfile, {
    onSuccess,
    onError,
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
    onError: (error: AxiosError) => {
      onError(error.response?.data);
    },
  });
};
