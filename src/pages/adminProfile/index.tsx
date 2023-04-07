import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import cn from 'classnames';

import { Button, Label } from '@/components';
import { useUpdateAdminProfile } from '@/hooks/useAdminData';
import Input from '@/components/input';

function AdminProfile() {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showDetails, setShowDetails] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setUsername(userData.username);
    setEmail(userData.email);
  }, [userData.email, userData.username]);

  const handleSuccess = (data: { username: string; email: string }) => {
    const { username, email } = data;
    setPassword('');
    setPassword('');
    setConfirmPassword('');
    toast.success('User Updated Successfully');
    localStorage.setItem(
      'userData',
      JSON.stringify({
        ...userData,
        username: username,
        email: email
      })
    );
  };

  const handleError = (error: { message: string }) => {
    toast.error(error.message);
  };

  const { mutate, isLoading } = useUpdateAdminProfile(handleSuccess, handleError);

  const handleSettingChange = (text: 'details' | 'password') => {
    setShowDetails(text === 'details');
  };

  const renderDetails = () => {
    return (
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (!isLoading) {
            mutate({
              username,
              email,
              updateEmail: userData.email !== email
            });
          }
        }}
        className="flex flex-col ml-10 w-64">
        <h2 className="text-xl mb-4 font-bold select-none">Details</h2>

        <div className="mb-4">
          <span className="block">Name</span>
          <Input
            type="text"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value);
            }}
            required
          />
        </div>

        <div className="mb-4">
          <span className="block">Email</span>

          <Input
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <Button
          disabled={isLoading || !username || !email}
          type="submit"
          isLoading={isLoading}
          text="Update"
        />
      </form>
    );
  };

  const renderPassword = () => {
    return (
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (confirmPassword !== '' && password !== confirmPassword) {
            setError('Passwords do not match');
          } else {
            if (!isLoading) {
              mutate({
                email,
                username,
                password: password,
                updateEmail: userData.email !== email
              });
            }
          }
        }}
        className="flex flex-col ml-10 w-64">
        <h2 className="text-xl mb-4 font-bold select-none">Change Password</h2>
        <div className="mb-4">
          <Label value="New Password" />
          <div className="relative">
            <Input
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <Label value="Confirm Password" />
          <div className="relative">
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setError('');
                setConfirmPassword(e.target.value);
              }}
              required
            />
          </div>
          {error && <span className="text-red-400">{error}</span>}
        </div>

        <Button
          disabled={isLoading || confirmPassword === '' || password === '' || password === ''}
          type="submit"
          isLoading={isLoading}
          text="Update"
        />
      </form>
    );
  };

  return (
    <div className="flex">
      <div className="flex bg-violet-100 border-solid border-2 border-violet-200 rounded-lg py-4 flex-col w-56">
        <p className="mb-4 text-2xl px-6">Settings</p>

        <span
          className={cn(
            'text-lg mb-1 cursor-pointer hover:bg-violet-200 block mx-2 px-4 py-2 select-none rounded-md',
            {
              ['bg-violet-200']: showDetails
            }
          )}
          onClick={() => handleSettingChange('details')}>
          My Details
        </span>
        <span
          className={cn(
            'text-lg cursor-pointer hover:bg-violet-200 block mx-2 px-4 py-2 select-none rounded-md',
            {
              ['bg-violet-200']: !showDetails
            }
          )}
          onClick={() => {
            handleSettingChange('password');
          }}>
          Password
        </span>
      </div>

      {showDetails ? renderDetails() : renderPassword()}
    </div>
  );
}

export default AdminProfile;
