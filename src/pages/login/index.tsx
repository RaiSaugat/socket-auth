import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useLogin } from '@/hooks/useLoginData';
import { Button, Label } from '@/components';
import Input from '@/components/input';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [error, setError] = useState<string | null>('');

  const handleOnSuccess = (data: {
    id: string;
    email: string;
    token: string;
    type: 'USER' | 'ADMIN';
    username: string;
  }) => {
    const { id, token, username, email, type } = data;
    const tokenExpirationDate: string | Date = new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        id: id,
        token: token,
        username: username,
        email: email,
        type: type,
        expiration:
          typeof tokenExpirationDate === 'string'
            ? tokenExpirationDate
            : tokenExpirationDate.toISOString()
      })
    );
    if (type === 'USER') {
      navigate('/rooms');
    } else {
      navigate('/admin');
    }
  };

  const handleOnError = (error: { field: string; message: string }[] | { message: string }) => {
    if (!Array.isArray(error)) {
      toast.error(error.message);
    } else {
      error.map((err) => {
        toast.error(err.message);
      });
    }
  };

  const { mutate, isLoading } = useLogin(handleOnSuccess, handleOnError);

  const handleLogin = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={(e: React.MouseEvent<HTMLFormElement>) => {
          if (!isLoading) {
            handleLogin(e);
          }
        }}
        className="bg-violet-100 border-2 border-violet-300 border-solid rounded-md p-5">
        <div className="mb-4">
          <Label value="Email" />
          <Input
            type="text"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setError('');
              setEmail(e.target.value);
            }}
            required
          />
        </div>

        <div className="mb-4">
          <Label value="Password" />
          <Input
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setError('');
              setPassword(e.target.value);
            }}
            required
          />
        </div>

        <Button type="submit" disabled={isLoading} text="Login" isLoading={isLoading} />

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
