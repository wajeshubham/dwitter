import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import withAuth from '../HOC/withAuth';
import {
  MdClose,
  MdImage,
  MdOutlineBookmarkAdd,
  MdOutlineExplore,
  MdOutlineHome,
  MdOutlineImage,
  MdOutlineList,
  MdOutlineMessage,
  MdOutlineMore,
  MdOutlineNotifications,
} from 'react-icons/md';
import Button from '../components/Button';
import useDwitter from '../hooks/useDwitter';
import Loader from '../components/Loader';
import TextArea from '../components/TextArea';
import Dweet from '../components/Dweet';
import Modal from '../components/Modal';
import {
  addClassToBody,
  isLgScreen,
  removeClassFromBody,
} from '../utils/functions';
import DweetForm from '../components/DweetForm';
import { DweetI } from '../types/interfaces';
import Image from 'next/image';
import BlogItem from '../components/BlogItem';
import data from '../json/blogs.json';

const Home: React.FC<{}> = () => {
  const { user, isLoading, getDweets, addDweet, likeDweet } = useDwitter();
  const [savedDweets, setSavedDweets] = useState<DweetI[]>([]);
  const [openDweetModal, setOpenDweetModal] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchDweets = async () => {
    const dweets = await getDweets();
    setSavedDweets(dweets || []);
  };

  const createDweet = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: {
      dweetContent: string;
      dweetImages: string[];
    },
    callback: () => void
  ) => {
    e.preventDefault();
    try {
      const dweets = await addDweet(data.dweetContent, data.dweetImages);
      if (dweets) {
        setSavedDweets(dweets);
        setOpenDweetModal(false);
        callback();
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (dweetId: string) => {
    const dweets = await likeDweet(dweetId);
    if (dweets) {
      setSavedDweets(dweets);
    }
  };

  useEffect(() => {
    fetchDweets();
  }, []);

  return (
    <>
      <Header
        mobileSrc={user?.avatar}
        onLogoClick={() => {
          isLgScreen() && setOpen(true);
          isLgScreen() && addClassToBody('overflow-hidden');
        }}
      />

      {isLoading ? (
        <Loader message="Ethereum transactions are slow! Hold tight!" />
      ) : null}
      <Modal
        open={openDweetModal}
        title=""
        onClose={() => {
          setOpenDweetModal(false);
          removeClassFromBody('overflow-hidden');
          setOpen(false);
        }}
      >
        <DweetForm
          parentProps={{
            className: 'mt-10',
          }}
          onSubmit={(e, data, callback) => {
            createDweet(e, data, callback);
          }}
        />
      </Modal>
      <div className="mt-20 flex flex-row px-0 text-black dark:text-white lg:px-32">
        <div
          className={`lg:top-unset fixed top-0 left-0 z-40 h-[100vh] md:w-[350px] lg:sticky lg:top-20 lg:h-0 ${
            !open
              ? '-translate-x-[350px] lg:translate-x-[unset]'
              : 'translate-x-0 lg:translate-x-[unset]'
          } bg-white p-8 shadow-lg shadow-[#00000022] transition-transform duration-300 dark:bg-black dark:shadow-[#ffffff22] lg:flex lg:w-[20%] lg:bg-transparent lg:p-0 lg:shadow-none lg:dark:bg-transparent`}
        >
          <MdClose
            fontSize={24}
            className="absolute top-3 right-3 block cursor-pointer lg:hidden"
            onClick={() => {
              setOpen(!open);
              removeClassFromBody('overflow-hidden');
            }}
          />
          <ul className="text-xl lg:fixed">
            <li className="mb-7 flex cursor-pointer flex-row items-center justify-start gap-4">
              <MdOutlineHome fontSize={28} />
              Home
            </li>
            <li className="my-7 flex cursor-pointer flex-row items-center justify-start gap-4">
              <MdOutlineExplore fontSize={28} />
              Explore
            </li>
            <li className="my-7 flex cursor-pointer flex-row items-center justify-start gap-4">
              <MdOutlineNotifications fontSize={28} />
              Notifications
            </li>
            <li className="my-7 flex cursor-pointer flex-row items-center justify-start gap-4">
              <MdOutlineMessage fontSize={28} />
              Messages
            </li>
            <li className="my-7 flex cursor-pointer flex-row items-center justify-start gap-4">
              <MdOutlineBookmarkAdd fontSize={28} />
              Bookmark
            </li>
            <li className="my-7 flex cursor-pointer flex-row items-center justify-start gap-4">
              <MdOutlineList fontSize={28} />
              Lists
            </li>
            <li
              className="my-7 flex cursor-pointer flex-row items-center justify-start gap-4"
              onClick={() => {
                alert(
                  'Please manually disconnect the account from your wallet and refresh'
                );
              }}
            >
              <MdOutlineMore fontSize={28} />
              Logout
            </li>
            <li className="my-7 flex cursor-pointer flex-row items-center justify-start gap-4">
              <Button
                className="min-w-[170px] "
                label="Dweet"
                onClick={() => {
                  setOpen(false);
                  addClassToBody('overflow-hidden');
                  setOpenDweetModal(true);
                }}
              />
            </li>
            <li className="mt-auto flex gap-4">
              <img
                className="h-12 w-12
                rounded-full bg-gray-300 object-cover dark:bg-gray-700"
                src={user?.avatar}
              />
              <div className="flex flex-col ">
                <h2 className="text-md font-bold text-black dark:text-white">
                  {user?.name}
                </h2>
                <p className="my-0 text-sm font-thin text-gray-500 ">
                  @{user?.username}
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className=" min-h-[100vh] w-[100%] border-l-[0.1px] border-r-[0.1px] border-gray-300 dark:border-gray-800 md:w-[60%] lg:w-[45%]">
          <DweetForm
            parentProps={{
              className:
                'border-b-[0.1px] border-gray-300 p-4 dark:border-gray-800',
            }}
            onSubmit={async (e, data, callback) => {
              await createDweet(e, data, callback);
            }}
          />

          {[...savedDweets]
            .slice() // slice to make a copy of the array
            .reverse() // reverse the array
            .map((d: DweetI, i) => {
              return (
                <Dweet
                  key={i}
                  id={d?.id}
                  userAvatar={d?.author?.avatar || ''}
                  userName={d?.author?.name || ''}
                  userHandle={d?.author?.username || ''}
                  dweetText={d?.content}
                  timestamp={d?.timestamp}
                  images={d?.images}
                  likes={d?.likes}
                  onLike={(id) => {
                    handleLike(id);
                  }}
                />
              );
            })}
        </div>
        <div className="mb-32 hidden flex-col gap-2 px-4 md:flex md:w-[40%] lg:w-[35%]">
          <div className="sticky -top-40 flex h-fit w-full flex-col rounded-xl bg-gray-100 dark:bg-gray-900">
            <h1 className="p-4 text-xl font-semibold">Programming blogs</h1>
            {data.blogs.map((blog, i) => {
              return <BlogItem blog={blog} key={i} />;
            })}
            <p
              className="cursor-pointer p-4 text-sm font-thin text-blue-500 hover:underline"
              onClick={() => {
                window.location.href = 'https://hashnode.com/@wajeshubham';
              }}
            >
              Show more
            </p>
            <div className="absolute -bottom-7 flex flex-row items-center justify-start gap-2">
              <a
                className="text-[13px] font-extralight text-gray-600 hover:underline dark:text-gray-400 "
                href="https://github.com/wajeshubham"
              >
                @wajeshubham
              </a>
              <div className="flex h-[2px] w-[2px] items-center justify-center rounded-full bg-gray-600 dark:text-gray-400 "></div>
              <a
                className="text-[13px] font-extralight text-gray-600 hover:underline dark:text-gray-400 "
                href="https://github.com/wajeshubham/dwitter"
              >
                See the source code
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Home);
