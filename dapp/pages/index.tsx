import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Button from '../components/Button';
import useDwitter from '../hooks/useDwitter';
import { MdOutlineDarkMode, MdOutlineWbSunny } from 'react-icons/md';
import { useEffect, useState } from 'react';
import useTheme from '../hooks/useTheme';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { FaTwitter } from 'react-icons/fa';
import { shortenAddress } from '../utils/functions';
import { useRouter } from 'next/router';
import withoutAuth from '../HOC/withoutAuth';
import FileUploader from '../components/FileUploader';
import Loader from '../components/Loader';

const WelcomePage: NextPage = () => {
  const router = useRouter();
  const { connect, account, user, signup, isLoading, getUser } = useDwitter();
  const { theme, toggleTheme } = useTheme();
  const [signupModal, setSignupModal] = useState(false);
  const [state, setState] = useState({
    username: '',
    fullName: '',
    bio: '',
    avatarUrl: '',
  });
  const [errors, setErrors] = useState({
    usernameError: '',
    fullNameError: '',
    bioError: '',
    avatarUrlError: '',
  });

  const closeSignupModal = () => {
    setSignupModal(false);
    setState({
      username: '',
      fullName: '',
      bio: '',
      avatarUrl: '',
    });
  };

  const validateSignup = () => {
    let _errors = errors;
    let error = false;
    _errors.usernameError = !state.username ? 'Username is required' : '';
    _errors.fullNameError = !state.fullName ? 'Full name is required' : '';
    _errors.bioError = !state.bio ? 'Bio is required' : '';
    _errors.avatarUrlError = !state.avatarUrl ? 'Avatar url is required' : '';
    setErrors({ ..._errors });
    Object.entries(_errors).map((val) => {
      if (val[1]) {
        error = true;
      }
    });
    return error;
  };

  const handleSignup = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    let hasError = validateSignup();
    if (hasError) {
      return;
    }
    try {
      let user = await signup(
        state.username,
        state.fullName,
        state.bio,
        state.avatarUrl
      );
      if (user && user.wallet) {
        closeSignupModal();
      }
    } catch (error) {
      closeSignupModal();
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader message="Ethereum transactions are slow! Hold tight!" />
      ) : null}
      <div className="flex flex-col-reverse items-center justify-center sm:h-full sm:w-full sm:flex-row">
        <Modal
          title="Create your account"
          open={signupModal}
          onClose={() => {
            closeSignupModal();
          }}
        >
          <div className="my-4 flex w-full flex-row items-center justify-center">
            <FileUploader
              uploadLabel={() => (
                <>
                  {state.avatarUrl ? (
                    <label htmlFor={'avatar_url'}>
                      <img
                        className="h-32 w-32 rounded-full object-cover"
                        src={state.avatarUrl}
                      />
                    </label>
                  ) : (
                    <label
                      htmlFor={'avatar_url'}
                      className="h-32 w-32 rounded-full bg-gray-300 dark:bg-gray-700"
                    />
                  )}
                </>
              )}
              id="avatar_url"
              setSrc={(src) => {
                setState({ ...state, avatarUrl: src });
              }}
            />
          </div>
          <Input
            placeholder="Username"
            type={'text'}
            value={state.username}
            onChange={(e) => {
              setState({ ...state, username: e.target.value });
            }}
            error={errors.usernameError}
            onFocus={() => {
              setErrors({ ...errors, usernameError: '' });
            }}
          />
          <Input
            placeholder="Full name"
            type={'text'}
            value={state.fullName}
            onChange={(e) => {
              setState({ ...state, fullName: e.target.value });
            }}
            error={errors.fullNameError}
            onFocus={() => {
              setErrors({ ...errors, fullNameError: '' });
            }}
          />
          <Input
            placeholder="Bio"
            type={'text'}
            value={state.bio}
            onChange={(e) => {
              setState({ ...state, bio: e.target.value });
            }}
            error={errors.bioError}
            onFocus={() => {
              setErrors({ ...errors, bioError: '' });
            }}
          />

          <Button
            label="Signup"
            disabled={
              !state.username ||
              !state.fullName ||
              !state.bio ||
              !state.avatarUrl
            }
            className="my-4"
            onClick={(e) => {
              handleSignup(e);
            }}
          />
        </Modal>

        <Head>
          <title>Dwitter</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {!theme ? (
          <MdOutlineDarkMode
            fontSize={24}
            className="absolute right-4 top-6 cursor-pointer text-black sm:top-5 "
            onClick={toggleTheme}
          />
        ) : (
          <MdOutlineWbSunny
            fontSize={24}
            className="absolute right-4 top-6 cursor-pointer text-white sm:top-5 "
            onClick={toggleTheme}
          />
        )}
        <div className="relative flex h-full w-[100%] items-center justify-center sm:h-[100vh] sm:w-[55%]">
          <img
            src="https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png"
            alt="Dwitter"
            className=" h-full w-full object-cover"
          />
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="#fff"
            className="absolute top-[50%] h-28 w-28 -translate-y-1/2 sm:h-48 sm:w-48 md:h-96 md:w-96"
          >
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>
        </div>
        <div className="h-[100vh] w-[100%] bg-white dark:bg-black sm:w-[45%] sm:p-10">
          <main className="flex h-full w-full flex-1  flex-col items-center justify-center px-4 text-center sm:w-[100%] sm:items-start">
            <FaTwitter
              className="absolute top-4 left-4 text-blue-500 dark:text-white sm:left-[unset]"
              fontSize={40}
            />

            <h1 className="text-left text-4xl font-bold text-black dark:text-white sm:text-5xl">
              Welcome to{' '}
              <span className="text-blue-500 dark:text-blue-400">Dwitter</span>
            </h1>

            {!account ? (
              <Button
                className="my-4 min-w-[310px]"
                label="Connect ethereum wallet"
                onClick={() => {
                  connect(true);
                }}
              />
            ) : account.toUpperCase() !== user?.wallet.toUpperCase() ? (
              <>
                <Button
                  label="Wallet is connected please Signup"
                  className="my-4 min-w-[310px]"
                  onClick={() => {
                    setSignupModal(true);
                  }}
                />
                <div className="my-8 flex items-center justify-start gap-2">
                  <div className="h-[0.1px] w-[140px] bg-gray-400 dark:bg-gray-700" />
                  <span className="text-xs font-thin text-black dark:text-white">
                    <FaTwitter
                      className="text-blue-500 dark:text-white"
                      fontSize={28}
                    />
                  </span>
                  <div className="h-[0.1px] w-[140px] bg-gray-400 dark:bg-gray-700" />
                </div>
                <h1 className="text-md font-bold text-black dark:text-white sm:text-lg">
                  What's my address?
                </h1>
                <Button
                  className="my-4 min-w-[310px]"
                  title={account}
                  label={shortenAddress(account)}
                  onClick={() => {}}
                />
              </>
            ) : (
              <>
                <div className="my-8 flex items-center justify-start gap-2">
                  <div className="h-[0.1px] w-[140px] bg-gray-400 dark:bg-gray-700" />
                  <span className="text-xs font-thin text-black dark:text-white">
                    <FaTwitter
                      className="text-blue-500 dark:text-white"
                      fontSize={28}
                    />
                  </span>
                  <div className="h-[0.1px] w-[140px] bg-gray-400 dark:bg-gray-700" />
                </div>
                <h1 className="text-md font-bold text-black dark:text-white sm:text-lg">
                  Logged in!
                </h1>
                <Button
                  className="my-4 min-w-[310px] "
                  label="Go to home page"
                  onClick={() => {
                    router.replace('/home');
                  }}
                />
              </>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default withoutAuth(WelcomePage);
