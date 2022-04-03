import React, { useRef } from 'react';
import { MdClose } from 'react-icons/md';
import { FaTwitter } from 'react-icons/fa';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

const Modal: React.FC<{
  title: string;
  open?: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}> = ({ title, open, children, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside<HTMLDivElement>(ref, () => {
    onClose && onClose();
  });

  if (!open) return null;
  return (
    <div className="fixed inset-0  z-50 flex h-full w-full items-center justify-center bg-blue-400 bg-opacity-20 sm:top-0">
      <div
        ref={ref}
        className="dwitter-modal flex max-h-[650px] w-[96%] flex-col overflow-auto rounded-xl bg-white p-4 shadow-md shadow-[#00000022] dark:bg-black dark:shadow-[#ffffff22] sm:max-w-[620px]"
      >
        <span className="flex w-full flex-row items-center text-black dark:text-white">
          <MdClose
            className="cursor-pointer "
            fontSize={24}
            onClick={() => {
              onClose && onClose();
            }}
          />
          <FaTwitter
            className="m-auto text-blue-500 dark:text-white"
            fontSize={36}
          />
        </span>
        {title && (
          <h1 className="my-5 flex flex-row items-center justify-between text-xl font-bold text-black dark:text-white sm:text-3xl">
            {title}{' '}
          </h1>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
