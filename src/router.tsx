import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Home, Prompter, Translator, Telecast } from './pages';
import { connectSocket } from './utils/helper';

const socket = connectSocket();

export const ProtectedRoute = () => {
  const data = localStorage.getItem('room');
  const roomName = JSON.parse(data || '');

  return roomName ? <Outlet /> : <Navigate to='/' />;
  ``;
};

const router = (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route element={<ProtectedRoute />}>
      <Route path='/telecast' element={<Telecast socket={socket} />} />
      <Route path='/translator' element={<Translator socket={socket} />} />
      <Route path='/prompter' element={<Prompter socket={socket} />} />
    </Route>
  </Routes>
);

export default router;
