import { useState } from 'react';
import { toast } from 'react-toastify';
import cn from 'classnames';

import { useCreateUser } from '@/hooks/useAdminData';

function CreateUser() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleOnSuccess = () => {
    toast.success('User created successfully');
  };

  const handleOnError = (
    error: { field: string; message: string }[] | string | { message: string }
  ) => {
    if (!Array.isArray(error)) {
      toast.error(error as string);
    } else {
      error.map((err) => {
        toast.error(err.message);
      });
    }
  };

  const { mutate, isLoading } = useCreateUser(handleOnSuccess, handleOnError);

  console.log(isLoading);

  const handleCreateUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    mutate({
      email,
      password,
      type: 'USER',
      username: name,
    });
  };

  return (
    <form action='' className='mx-auto max-w-[500px]'>
      <div className='mb-4'>
        <span className='block'>Name</span>
        <input
          type='text'
          value={name}
          onChange={(e) => {
            setName(e.target.value);
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

      <div className='mb-4'>
        <span className='block'>Password</span>
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
        <span className='block'>Confirm Password</span>
        <input
          type='password'
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          className={cn(
            'w-full h-10 p-2 border-2 border-gray-300 rounded-md mr-4',
            {
              'border-[2px] border-red-300 border-solid':
                confirmPassword && password !== confirmPassword,
            }
          )}
        />
      </div>

      <button
        className='mt-4 px-2 py-4 bg-[#3aa168] hover:bg-[#219d59] text-white w-full rounded-md flex items-center justify-center font-bold cursor-pointer mr-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed h-10'
        onClick={handleCreateUser}
        // disabled={isLoading || !name || !email || !password || !confirmPassword}
      >
        Create User
      </button>
    </form>
  );
}

export default CreateUser;
