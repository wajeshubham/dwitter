import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Dwitter from '../json/Dwitter.json';
import { DweetI, User } from '../types/interfaces';
import { LocalStorage } from '../utils/classes';
import { addClassToBody, removeClassFromBody } from '../utils/functions';

const contractABI = Dwitter.abi;
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const Ethereum = typeof window !== 'undefined' && (window as any).ethereum;

const getDwitterContract = () => {
  if (!Ethereum) {
    alert(
      'Please install MetaMask if you are on desktop. Use MetaMask browser if you are on the mobile browser.'
    );
    return;
  }
  const provider = new ethers.providers.Web3Provider(Ethereum);
  const signer = provider.getSigner();
  const DwitterContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  return DwitterContract;
};

const useDwitter = () => {
  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getConnectedAccount = async (openMetamask?: boolean) => {
    try {
      if (!Ethereum) {
        console.log('Please install MetaMask');
        if (openMetamask) {
          // show alert on button click
          alert(
            'Please install MetaMask if you are on desktop. Use MetaMask browser if you are on the mobile browser.'
          );
        }

        return null;
      }

      // only open metamask on button click else get connected accounts
      const accounts: string[] = openMetamask
        ? await Ethereum?.request({ method: 'eth_requestAccounts' })
        : await Ethereum?.request({
            method: 'eth_accounts',
          });

      if (accounts?.length === 0) {
        return null;
      }
      setIsLoading(true);
      const account = accounts[0];
      setCurrentAccount(account);
      setIsLoading(false);
      return account; // return the active account
    } catch (error) {
      console.log(error, 'ERROR');
      setIsLoading(false);
      alert(
        'Please install MetaMask if you are on desktop. Use MetaMask browser if you are on the mobile browser.'
      );
      return null;
    }
  };

  const getUser = async () => {
    const dwitter = getDwitterContract();
    let account = await getConnectedAccount(); // get actual current account
    try {
      // below function might send 0x00000... if user account doesn't exist
      const user = await dwitter?.getUser(account);
      // if user doesn't exist, return null
      if (user?.wallet.toUpperCase() === account?.toUpperCase()) {
        const { name, username, bio, avatar, wallet } = user;
        setCurrentUser({ name, username, bio, avatar, wallet });
        LocalStorage.set('user', { name, username, bio, avatar, wallet });
        setIsLoading(false);
        return { name, username, bio, avatar, wallet };
      }

      setIsLoading(false);
      return null;
    } catch (error: any) {
      setIsLoading(false);
      console.log({ ...error }, 'NOT SIGNED UP');
    }
  };

  const getDweets = async () => {
    const dwitter = getDwitterContract();

    try {
      const dweets = await dwitter?.getDweets();

      const dweetsArray: DweetI[] = dweets.map((dweet: DweetI) => {
        const { id, author, content, timestamp, images, likes } = dweet;
        let obj: DweetI = {
          id,
          author: { ...author },
          timestamp: (timestamp as any).toNumber() * 1000,
          content,
          images,
          likes,
        };
        return obj;
      });
      return dweetsArray;
    } catch (error) {
      console.log(error, 'ERROR');
      return null;
    }
  };

  const createUser = async (
    username: string,
    name: string,
    bio: string,
    avatar: string
  ) => {
    const dwitter = getDwitterContract();
    setIsLoading(true);

    try {
      let transactionHash = await dwitter?.signup(username, name, bio, avatar);
      await transactionHash?.wait(); // waiting for transaction to be mined
      const user = await getUser(); // get saved user
      setIsLoading(false);
      return user; // return the saved user
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      return null;
    }
  };

  const addDweet = async (content: string, images: string[]) => {
    const dwitter = getDwitterContract();
    setIsLoading(true);
    try {
      let transactionHash = await dwitter?.addDweet(
        content,
        Math.floor(Math.random() * 1000000000000).toString(),
        images
      );
      await transactionHash?.wait(); // waiting for transaction to be mined
      const dweets = await getDweets(); // get saved dweets
      setIsLoading(false);
      return dweets; // return the saved dweets
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const likeDweet = async (dweetId: string) => {
    const dwitter = getDwitterContract();
    setIsLoading(true);
    try {
      let transactionHash = await dwitter?.likeDweet(dweetId);
      await transactionHash?.wait(); // waiting for transaction to be mined
      const dweets = await getDweets(); // get saved dweets
      setIsLoading(false);
      return dweets; // return the saved dweets
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getConnectedAccount();
  }, []);

  useEffect(() => {
    if (currentAccount) {
      getUser();
    }
  }, [currentAccount]);

  useEffect(() => {
    if (isLoading) {
      addClassToBody('overflow-hidden');
    } else {
      removeClassFromBody('overflow-hidden');
    }
  }, [isLoading]);

  return {
    connect: getConnectedAccount,
    account: currentAccount,
    user: currentUser,
    signup: createUser,
    getUser,
    isLoading,
    addDweet,
    getDweets,
    likeDweet,
  };
};

export default useDwitter;
