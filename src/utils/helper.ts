import { io } from 'socket.io-client';
import { fetchToken } from '../hooks/useTokenData';

export const exportText = (text: string) => {
  // create a new text file
  const file = new Blob([text], { type: 'text/plain' });

  // create a new download link
  const a = document.createElement('a');
  const url = URL.createObjectURL(file);
  a.href = url;
  a.download = 'translation.txt';

  // simulate a click on the download link to initiate the download
  a.click();

  // clean up the URL object
  URL.revokeObjectURL(url);
};

export const connectSocket = async () => {
  const { token } = await fetchToken();

  const socketURL =
    import.meta.env.VITE_APP_HOST_ENV === 'development'
      ? import.meta.env.VITE_APP_API_BASE_URL_LOCAL
      : import.meta.env.VITE_APP_API_BASE_URL_PRODUCTION;

  let socket = io(socketURL, {
    transports: ['websocket', 'polling'],
    auth: {
      token,
    },
  });

  return socket;
};
