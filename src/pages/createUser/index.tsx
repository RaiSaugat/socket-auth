import { useState } from 'react';
import { toast } from 'react-toastify';

import { useCreateUser } from '@/hooks/useAdminData';
import Input from '@/components/input';
import { Button, Label } from '@/components';

function CreateUser() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleOnSuccess = () => {
    toast.success('User created successfully');
  };

  const handleOnError = (
    error: { field: string; message: string }[] | { message: string }
  ) => {
    if (!Array.isArray(error)) {
      toast.error(error.message);
    } else {
      error.map((err) => {
        toast.error(err.message);
      });
    }
  };

  const { mutate, isLoading } = useCreateUser(handleOnSuccess, handleOnError);

  const handleCreateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      mutate({
        email,
        password,
        type: 'USER',
        username: name,
      });
    }
  };

  return (
    <form onSubmit={handleCreateUser} className='mx-auto max-w-[500px]'>
      <div className='mb-4'>
        <Label value='Name' />
        <Input
          type='text'
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
          required
        />
      </div>

      <div className='mb-4'>
        <Label value='Email' />
        <Input
          type='email'
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
          required
        />
      </div>

      <div className='mb-4'>
        <Label value='Password' />
        <Input
          type='password'
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
          required
        />
      </div>

      <div className='mb-4'>
        <Label value='Confirm Password' />
        <Input
          type='password'
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setConfirmPassword(e.target.value);
            setError('');
          }}
          required
          classnames={error ? 'border-[2px] border-red-300 border-solid' : ''}
        />
        {error && <span className='text-red-400'>{error}</span>}
      </div>

      <Button
        disabled={isLoading}
        type='submit'
        isLoading={isLoading}
        text='Create User'
      />
    </form>
  );
}

export default CreateUser;
