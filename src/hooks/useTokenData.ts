import { useQuery } from 'react-query';

import axiosService from '@/lib/api/axiosService';

export const fetchToken = async () => {
  return await axiosService
    .get(`/api/v1/token`, true)
    .then((response: any) => response.data);
};

export const useFetchToken = (onSuccess?: any, onError?: any) => {
  return useQuery('fetchToken', fetchToken, {
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
  });
};
