import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Button, CopyClipboard, Input } from '@/components';
import { useGenerateToken, useUpdateToken } from '@/hooks/useAdminData';
import { useFetchToken } from '@/hooks/useTokenData';

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

  const { isLoading: fetchLoading } = useFetchToken(handleOnSuccess, handleOnError);

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

  const { mutate: generateToken, isLoading: tokenGenerateLoading } = useGenerateToken(
    handleOnGenerateSuccess,
    handleOnGenerateError
  );

  const handleTokenGenerate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (tokenId) {
      mutate(tokenId);
    } else {
      generateToken();
    }
  };

  return (
    <div className="p-20">
      <div className="flex mb-4">
        <Input type="text" value={token} readOnly />
        <CopyClipboard text={token} />
      </div>
      <Button
        onClick={handleTokenGenerate}
        disabled={isLoading || tokenGenerateLoading || fetchLoading}
        text="Generate Token"
        isLoading={isLoading || tokenGenerateLoading || fetchLoading}
        type="button"
      />
    </div>
  );
}

export default Admin;
