import { useState } from 'react';
import cn from 'classnames';

import ShowPassword from '../showPassword';

function Input({
  type,
  onChange,
  value,
  classnames = '',
  required = false,
}: {
  type: string;
  onChange: any;
  value: string;
  classnames?: string;
  required?: boolean;
}) {
  const [inputType, setInputType] = useState<'password' | 'text'>('password');

  if (type === 'password') {
    return (
      <div className='relative'>
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          className={cn(
            'w-full h-10 p-2 pl-3 pr-10 border-2 border-gray-300 rounded-md mr-4',
            {
              [classnames]: classnames,
            }
          )}
          required={required}
        />
        <ShowPassword
          classNames='absolute right-4 top-1/2 transform -translate-y-1/2'
          setInputType={setInputType}
          inputType={inputType}
        />
      </div>
    );
  }
  return (
    <input
      type='text'
      value={value}
      onChange={onChange}
      required={required}
      className='w-full h-10 p-2 border-2 border-gray-300 rounded-md mr-4'
    />
  );
}

export default Input;
