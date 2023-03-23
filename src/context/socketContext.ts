import { createContext } from 'react';
import { connectSocket } from '../utils/helper';

const SocketContext = createContext({ socket: connectSocket() });

export default SocketContext;
