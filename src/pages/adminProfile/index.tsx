import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Loader } from '../../components';
import { useUpdateAdminProfile } from '../../hooks/useAdminData';

function AdminProfile() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  useEffect(() => {
    setUsername(userData.username);
    setEmail(userData.email);
  }, []);

  const handleSuccess = (data: { username: string; email: string }) => {
    const { username, email } = data;
    console.log(data);
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

  return (
    <div className='flex flex-col w-[300px] mx-auto'>
      <h2>Edit Profile</h2>
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
}

export default AdminProfile;
