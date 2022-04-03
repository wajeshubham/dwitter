import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const Input: React.FC<InputProps> = ({ error, ...props }) => {
  return (
    <div className={`${error ? 'my-0 w-full' : 'my-2 w-full'}`}>
      <input
        {...props}
        className={`w-full rounded-[5px] border-[1px] ${
          error ? 'border-red-500' : 'border-gray-400 dark:border-gray-700'
        } bg-transparent p-4 text-black outline-none placeholder:text-gray-400  dark:text-white dark:placeholder:text-gray-600`}
      />
      {error && (
        <small className="relative -top-1 text-xs text-red-500">{error}</small>
      )}
    </div>
  );
};

export default Input;
