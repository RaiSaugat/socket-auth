import React, { useState } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Header } from '@/components';
import { Socket } from 'socket.io-client';

import { useFetchToken } from '@/hooks/useTokenData';
import { Prompter, Translator, Telecast, Rooms, Admin, CreateUser, AdminProfile } from '@/pages';
import Login from '@/pages/login';
import { connectSocket } from '@/utils/helper';

export const ProtectedRoute = () => {
  const data = localStorage.getItem('userData');
  const { type } = JSON.parse(data || '{}');

  const [socket, setSocket] = useState<Socket>();

  const handleOnSuccess = async () => {
    const socket = await connectSocket();
    setSocket(socket);
  };

  useFetchToken(handleOnSuccess);

  return type === 'USER' ? (
    <>
      <Header socket={socket} />
      <Outlet context={{ socket }} />
    </>
  ) : (
    <Navigate to="/" />
  );
  ``;
};

export const AdminRoute = () => {
  const data = localStorage.getItem('userData');
  const { type } = JSON.parse(data || '{}');

  return type === 'ADMIN' ? (
    <>
      <Header isAdmin />
      <div className="p-10 py-4">
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/" />
  );
  ``;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<AdminProfile />} />
          <Route path="/create-user" element={<CreateUser />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/telecast" element={<Telecast />} />
          <Route path="/translator" element={<Translator />} />
          <Route path="/prompter" element={<Prompter />} />
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
