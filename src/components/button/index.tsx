import React from 'react';

import Loader from '../loader';

function Button({
  text,
  onClick,
  disabled = false,
  type,
  isLoading = false
}: {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type: string;
  isLoading?: boolean;
}) {
  if (type === 'submit') {
    return (
      <button
        className="w-full flex items-center justify-center transition-all bg-[#A35DFE] hover:bg-[#b783fc] p-2 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed h-10"
        type="submit"
        disabled={disabled}>
        {isLoading ? <Loader color="#fff" /> : text}
      </button>
    );
  }

  return (
    <button
      className="w-full flex items-center justify-center transition-all bg-[#A35DFE] hover:bg-[#b783fc] p-2 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed h-10"
      type="submit"
      disabled={disabled}
      onClick={onClick}>
      {isLoading ? <Loader color="#fff" /> : text}
    </button>
  );
}

export default Button;
