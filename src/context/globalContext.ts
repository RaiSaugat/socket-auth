import { createContext } from 'react';
import { connectSocket } from '../utils/helper';

export const GlobalContext = createContext({
  room: '',
  type: '',
  setRoom: (room: string) => {},
  setType: (type: string) => {},
});
