import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import cn from 'classnames';

import { Loader } from '@/components';
import { useUpdateAdminProfile } from '@/hooks/useAdminData';

function AdminProfile() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const [showDetails, setShowDetails] = useState(true);

  useEffect(() => {
    setUsername(userData.username);
    setEmail(userData.email);
  }, []);

  const handleSuccess = (data: { username: string; email: string }) => {
    const { username, email } = data;
    setPassword('');
    setNewPassword('');
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

  const handleError = () => {
    toast.error('Failed to update User');
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
      <div className='flex flex-col ml-20'>
        <h2 className='text-xl mb-4 font-bold'>Details</h2>
        <div className='mb-4'>
          <span className='block'>Name</span>
          <input
            type='text'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
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
            className='w-full h-10 p-2 border-2 border-gray-300 rounded-md mr-4'
          />
        </div>

        <button
          className='flex items-center justify-center bg-[#3aa168] hover:bg-[#219d59] p-2 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed h-10'
          disabled={isLoading}
          onClick={() => {
            if (!isLoading) {
              mutate({ username, email });
            }
          }}
        >
          {isLoading ? <Loader color='#fff' /> : 'Update'}
        </button>
      </div>
    );
  };

  const renderPassword = () => {
    return (
      <div className='flex flex-col ml-20'>
        <h2 className='text-xl mb-4 font-bold'>Change Password</h2>
        <div className='mb-4'>
          <span className='block'>Old Password</span>
          <input
            type='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className='w-full h-10 p-2 border-2 border-gray-300 rounded-md mr-4'
          />
        </div>

        <div className='mb-4'>
          <span className='block'>New Password</span>
          <input
            type='password'
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            className='w-full h-10 p-2 border-2 border-gray-300 rounded-md mr-4'
          />
        </div>

        <div className='mb-4'>
          <span className='block'>Confirm Password</span>
          <input
            className={cn(
              'w-full h-10 p-2 border-2 border-gray-300 rounded-md mr-4',
              {
                'border-[2px] border-red-300 border-solid':
                  confirmPassword && newPassword !== confirmPassword,
              }
            )}
            type='password'
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>

        <button
          className='flex items-center justify-center bg-[#3aa168] hover:bg-[#219d59] p-2 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed h-10'
          disabled={
            isLoading ||
            confirmPassword === '' ||
            newPassword === '' ||
            password === '' ||
            (confirmPassword !== '' && newPassword !== confirmPassword)
          }
          onClick={() => {
            if (!isLoading) {
              mutate({ email, username, password: newPassword });
            }
          }}
        >
          {isLoading ? <Loader color='#fff' /> : 'Update'}
        </button>
      </div>
    );
  };

  return (
    <div className='flex'>
      <div className='flex bg-violet-100 border-solid border-2 border-violet-200 rounded-lg py-4 mx-4 flex-col w-56'>
        <p className='mb-4 text-2xl px-6'>Settings</p>

        <span
          className='text-lg mb-1 cursor-pointer hover:bg-violet-200 block mx-2 px-4 py-2 select-none rounded-md'
          onClick={() => handleSettingChange('details')}
        >
          My Details
        </span>
        <span
          className='text-lg cursor-pointer hover:bg-violet-200 block mx-2 px-4 py-2 select-none rounded-md'
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
