import React, { forwardRef, useState } from 'react';
import cn from 'classnames';

import ShowPassword from '../showPassword';

type Props = {
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  classnames?: string;
  required?: boolean;
  readOnly?: boolean;
};

type Ref = HTMLInputElement;

const Input = forwardRef<Ref, Props>((props, ref) => {
  const { type, onChange, value, classnames = '', required = false, readOnly = false } = props;
  const [inputType, setInputType] = useState<'password' | 'text'>('password');

  if (type === 'password') {
    return (
      <div className="relative">
        <input
          ref={ref}
          type={inputType}
          value={value}
          onChange={onChange}
          className={cn('w-full h-10 p-2 pl-3 pr-10 border-2 border-gray-300 rounded-md mr-4', {
            [classnames]: !!classnames
          })}
          required={required}
          readOnly={readOnly}
        />
        <ShowPassword
          classNames="absolute right-4 top-1/2 transform -translate-y-1/2"
          setInputType={setInputType}
          inputType={inputType}
        />
      </div>
    );
  }
  return (
    <input
      ref={ref}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className={cn('w-full h-10 p-2 border-2 border-gray-300 rounded-md mr-4', {
        [classnames]: !!classnames
      })}
      readOnly={readOnly}
    />
  );
});

Input.displayName = 'Input';

export default Input;
