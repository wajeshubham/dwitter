import React from 'react';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

const TextArea: React.FC<TextAreaProps> = ({ error, ...props }) => {
  return (
    <div className={`w-full`}>
      <textarea
        {...props}
        className={`w-full bg-transparent text-black outline-none placeholder:text-gray-400  dark:text-white dark:placeholder:text-gray-600 ${props.className}`}
      />
      {error && (
        <small className="relative -top-1 text-xs text-red-500">{error}</small>
      )}
    </div>
  );
};

export default TextArea;
