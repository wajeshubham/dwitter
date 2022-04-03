import React, { useEffect, useState } from 'react';
import { LocalStorage } from '../utils/classes';

const useTheme = () => {
  const [theme, setTheme] = useState('');

  const toggleTheme = () => {
    theme === 'dark'
      ? document.getElementsByTagName('html')[0].classList.remove('dark')
      : document.getElementsByTagName('html')[0].classList.add('dark');
    theme === 'dark'
      ? document.body.classList.remove('dark')
      : document.body.classList.add('dark');
    let selectedTheme = theme === 'dark' ? '' : 'dark';
    setTheme(selectedTheme);
    LocalStorage.set('theme', selectedTheme);
  };

  useEffect(() => {
    let preservedTheme = LocalStorage.get('theme');
    preservedTheme
      ? document.getElementsByTagName('html')[0].classList.add('dark')
      : document.getElementsByTagName('html')[0].classList.remove('dark');
    preservedTheme
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark');
    setTheme(preservedTheme);
  }, []);

  return {
    theme,
    toggleTheme,
  };
};

export default useTheme;
