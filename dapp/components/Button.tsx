import React from 'react';
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  transparent?: boolean;
};

const Button: React.FC<ButtonProps> = ({ label, transparent, ...props }) => {
  return (
    <button
      {...props}
      className={`  
      ${
        props.disabled
          ? 'cursor-not-allowed bg-blue-500 text-white opacity-50 hover:bg-blue-500'
          : 'bg-blue-500 hover:bg-blue-600'
      } rounded-full py-2 px-6 text-[18px] font-bold text-white ${
        props.className
      }`}
      onClick={props.onClick}
    >
      {label}
    </button>
  );
};

export default Button;
