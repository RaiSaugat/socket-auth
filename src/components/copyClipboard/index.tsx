import { useEffect, useState } from 'react';

import CopyIcon from '../../assets/copy.svg';

function CopyClipboard({ text }: { text: string }) {
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const handleCopyToClipboard = (e: React.MouseEvent<HTMLSpanElement>) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopySuccess(false);
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [copySuccess]);

  return (
    <span
      className='group cursor-pointer relative'
      onClick={handleCopyToClipboard}
    >
      <img className='w-8 h-8' src={CopyIcon} />
      <span className='group-hover:block hidden absolute top-[-32px] border-solid border-[1px] border-black text-sm bg-white rounded-lg px-2 w-max'>
        {copySuccess ? 'Copied!' : 'Copy '}
      </span>
    </span>
  );
}

export default CopyClipboard;
