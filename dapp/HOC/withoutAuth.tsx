import { useRouter } from 'next/router';
import React, { ComponentType, useEffect, useState } from 'react';
import Loader from '../components/Loader';
import useDwitter from '../hooks/useDwitter';
import { User } from '../types/interfaces';
import { LocalStorage } from '../utils/classes';

const withoutAuth = <T extends object>(Component: ComponentType<T>) => {
  return (props: T) => {
    const { getUser } = useDwitter();
    const [verified, setVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const handleVerification = async () => {
      if (typeof window !== 'undefined') {
        const user: User | null = LocalStorage.get('user');
        const currentUser = await getUser();
        if (
          user &&
          currentUser &&
          user?.wallet.toUpperCase() === currentUser?.wallet.toUpperCase()
        ) {
          // if user is verified, turn verified to true and redirect to home page
          setIsLoading(false);
          setVerified(true);
          router.replace('/home');
        } else {
          // if user is not verified, remove user from local storage and stay on login page
          setIsLoading(false);
          setVerified(false);
          LocalStorage.remove('user');
        }
      }
    };

    useEffect(() => {
      handleVerification();
    }, []);

    if (isLoading) {
      return <Loader />;
    }

    if (!verified) {
      return <Component {...props} />;
    } else {
      return null;
    }
  };
};

export default withoutAuth;
