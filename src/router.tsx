import { useState } from 'react';
import { useQuery } from 'react-query';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import { Header } from './components';
import { useFetchToken } from './hooks/useTokenData';
import {
  Prompter,
  Translator,
  Telecast,
  Rooms,
  Admin,
  CreateUser,
  AdminProfile,
} from './pages';

import Login from './pages/login';
import { connectSocket } from './utils/helper';

export const ProtectedRoute = () => {
  const data = localStorage.getItem('userData');
  const { type } = JSON.parse(data || '{}');

  const [socket, setSocket] = useState<any>(null);

  const handleOnSuccess = (data: {
    id: string;
    createdAt: string;
    token: string;
    userId: string;
  }) => {
    localStorage.setItem('master-token', JSON.stringify(data.token));
    const socket = connectSocket();
    setSocket(socket);
  };

  useFetchToken(handleOnSuccess);

  return type === 'USER' ? (
    <>
      <Header />
      <Outlet context={{ socket }} />
    </>
  ) : (
    <Navigate to='/' />
  );
  ``;
};

export const AdminRoute = () => {
  const data = localStorage.getItem('userData');
  const { type } = JSON.parse(data || '{}');

  return type === 'ADMIN' ? (
    <>
      <Header isAdmin />
      <Outlet />
    </>
  ) : (
    <Navigate to='/' />
  );
  ``;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<AdminRoute />}>
          <Route path='/admin' element={<Admin />} />
          <Route path='/profile' element={<AdminProfile />} />
          <Route path='/create-user' element={<CreateUser />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/rooms' element={<Rooms />} />
          <Route path='/telecast' element={<Telecast />} />
          <Route path='/translator' element={<Translator />} />
          <Route path='/prompter' element={<Prompter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

// const router = (
//   <Routes>
//     <Route path='/' element={<Rooms socket={socket} />} />
//     <Route path='/admin' element={<Admin />} />
//     <Route element={<ProtectedRoute />}>
//       <Route path='/telecast' element={<Telecast socket={socket} />} />
//       <Route path='/translator' element={<Translator socket={socket} />} />
//       <Route path='/prompter' element={<Prompter socket={socket} />} />
//     </Route>
//     <Route path='/login' element={<Login />} />
//   </Routes>
// );

export default Router;
