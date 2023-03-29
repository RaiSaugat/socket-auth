import { useState } from 'react';
import { toast } from 'react-toastify';

import CopyClipboard from '../../components/copyClipboard';
import { useGenerateToken, useUpdateToken } from '../../hooks/useAdminData';
import { useFetchToken } from '../../hooks/useTokenData';

type TokenDTO = {
  createdAt: string;
  id: string;
  token: string;
  userId: string;
};

function Admin() {
  const [tokenId, setTokenId] = useState('');
  const [token, setToken] = useState('');

  const handleOnSuccess = (data: TokenDTO) => {
    if (data) {
      setToken(data.token || '');
      setTokenId(data.id || '');
    }
  };

  const handleOnError = () => {
    toast.error('Failed to fetch token');
  };

  useFetchToken(handleOnSuccess, handleOnError);

  const handleOnTokenUpdateSuccess = (data: TokenDTO) => {
    setToken(data.token);
    setTokenId(data.id);
    toast.success('New Token generated');
  };

  const handleOnTokenUpdateError = () => {
    toast.error('Failed to update token');
  };

  const handleOnGenerateSuccess = (data: TokenDTO) => {
    setToken(data.token);
    setTokenId(data.id);
    toast.success('Token generated');
  };

  const handleOnGenerateError = () => {
    toast.error('Failed to generate token');
  };

  const { mutate, isLoading } = useUpdateToken(
    handleOnTokenUpdateSuccess,
    handleOnTokenUpdateError
  );

  const { mutate: generateToken, isLoading: tokenGenerateLoading } =
    useGenerateToken(handleOnGenerateSuccess, handleOnGenerateError);

  const handleTokenGenerate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (tokenId) {
      mutate(tokenId);
    } else {
      generateToken();
    }
  };

  return (
    <div className='p-20'>
      <div className='flex'>
        <input
          type='text'
          value={token}
          readOnly
          className='w-full h-10 p-2 border-2 border-gray-300 rounded-md mr-4'
        />
        <CopyClipboard text={token} />
      </div>
      <button
        className='mt-4 px-2 py-4 bg-violet-600 hover:bg-violet-800 text-white h-10 w-full rounded-md flex items-center justify-center font-bold cursor-pointer mr-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed'
        onClick={handleTokenGenerate}
        disabled={isLoading || tokenGenerateLoading}
      >
        Generate Token
      </button>
    </div>
  );
}

export default Admin;
