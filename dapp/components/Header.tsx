import React, { useEffect, useState } from 'react';
import { FaTwitter } from 'react-icons/fa';
import { MdOutlineDarkMode, MdOutlineWbSunny } from 'react-icons/md';
import useTheme from '../hooks/useTheme';

const Header: React.FC<{ mobileSrc?: string; onLogoClick?: () => void }> = ({
  mobileSrc,
  onLogoClick,
}) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <nav className="fixed top-0 z-30 flex w-full flex-row items-center justify-between py-4 px-4 text-black backdrop-blur-[12px] dark:text-white md:px-20 lg:px-32">
        <div className="flex w-full flex-row items-center justify-start gap-5">
          <header>
            <FaTwitter
              className={`hidden cursor-pointer text-blue-500 dark:text-white lg:block`}
              fontSize={32}
              onClick={onLogoClick}
            />
            <img
              src={mobileSrc || ''}
              alt="dp"
              className={`block h-[40px] w-[40px] rounded-full lg:hidden`}
              onClick={onLogoClick}
            />
          </header>
          <input
            title="searchbar"
            className="w-3/4 rounded-full bg-gray-200 px-4 py-2 outline-none dark:bg-gray-800 lg:w-1/4 "
            placeholder="Search Dwitter"
          />
        </div>
        {!theme ? (
          <MdOutlineDarkMode
            fontSize={24}
            className="cursor-pointer text-black "
            onClick={toggleTheme}
          />
        ) : (
          <MdOutlineWbSunny
            fontSize={24}
            className="cursor-pointer text-white "
            onClick={toggleTheme}
          />
        )}
      </nav>
    </>
  );
};

export default Header;
