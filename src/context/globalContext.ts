import { createContext } from 'react';

export const GlobalContext = createContext({
  room: '',
  type: '',
  setRoom: (room: string) => {},
  setType: (type: string) => {},
});
