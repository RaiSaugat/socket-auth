import axios from 'axios';
import { useQuery } from 'react-query';

const fetchToken = () => {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  return axios({
    method: 'GET',
    url: 'http://localhost:3001/token',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userData.token,
    },
  }).then((response) => response.data);
};

export const useFetchToken = (onSuccess?: any, onError?: any) => {
  return useQuery('fetchToken', fetchToken, {
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
  });
};
