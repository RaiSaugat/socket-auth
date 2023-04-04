import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import cn from 'classnames';

import { Button, Label, Loader } from '@/components';
import { useUpdateAdminProfile } from '@/hooks/useAdminData';
import Input from '@/components/input';
import { AxiosError } from 'axios';

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
  }, []);

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
        email: email,
      })
    );
  };

  const handleError = (error: { message: string }) => {
    toast.error(error.message);
  };

  const { mutate, isLoading } = useUpdateAdminProfile(
    handleSuccess,
    handleError
  );

  const handleSettingChange = (text: 'details' | 'password') => {
    setShowDetails(text === 'details');
  };

  const renderDetails = () => {
    return (
      <div className='flex flex-col ml-10'>
        <h2 className='text-xl mb-4 font-bold'>Details</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!isLoading) {
              mutate({ username, email });
            }
          }}
        >
          <div className='mb-4'>
            <span className='block'>Name</span>
            <input
              type='text'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
              className='w-full h-10 p-2 border-2 border-gray-300 rounded-md mr-4'
            />
          </div>

          <div className='mb-4'>
            <span className='block'>Email</span>

            <input
              type='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              className='w-full h-10 p-2 border-2 border-gray-300 rounded-md mr-4'
            />
          </div>
          <Button
            disabled={isLoading || !username || !email}
            type='submit'
            isLoading={isLoading}
            text='Update'
          />
        </form>
      </div>
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
              mutate({ email, username, password: password });
            }
          }
        }}
        className='flex flex-col ml-10'
      >
        <h2 className='text-xl mb-4 font-bold select-none'>Change Password</h2>
        <div className='mb-4'>
          <Label value='New Password' />
          <div className='relative'>
            <Input
              type='password'
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
        </div>

        <div className='mb-4'>
          <Label value='Confirm Password' />
          <div className='relative'>
            <Input
              type='password'
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setError('');
                setConfirmPassword(e.target.value);
              }}
              required
            />
          </div>
          {error && <span className='text-red-400'>{error}</span>}
        </div>

        <Button
          disabled={
            isLoading ||
            confirmPassword === '' ||
            password === '' ||
            password === ''
          }
          type='submit'
          isLoading={isLoading}
          text='Update'
        />
      </form>
    );
  };

  return (
    <div className='flex'>
      <div className='flex bg-violet-100 border-solid border-2 border-violet-200 rounded-lg py-4 flex-col w-56'>
        <p className='mb-4 text-2xl px-6'>Settings</p>

        <span
          className={cn(
            'text-lg mb-1 cursor-pointer hover:bg-violet-200 block mx-2 px-4 py-2 select-none rounded-md',
            {
              ['bg-violet-200']: showDetails,
            }
          )}
          onClick={() => handleSettingChange('details')}
        >
          My Details
        </span>
        <span
          className={cn(
            'text-lg cursor-pointer hover:bg-violet-200 block mx-2 px-4 py-2 select-none rounded-md',
            {
              ['bg-violet-200']: !showDetails,
            }
          )}
          onClick={() => {
            handleSettingChange('password');
          }}
        >
          Password
        </span>
      </div>

      {showDetails ? renderDetails() : renderPassword()}
    </div>
  );
}

export default AdminProfile;
