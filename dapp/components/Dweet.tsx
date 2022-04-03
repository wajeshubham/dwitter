import moment from 'moment';
import React, { useState } from 'react';
import { FaRegComment } from 'react-icons/fa';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { FiShare } from 'react-icons/fi';
import { AiOutlineRetweet } from 'react-icons/ai';
import Modal from './Modal';
import useDwitter from '../hooks/useDwitter';

interface DweetProps {
  id: string;
  userAvatar: string;
  userName: string;
  userHandle: string;
  timestamp: number;
  dweetText: string;
  images: string[];
  likes: string[];
  onLike: (id: string) => void;
}

const Dweet: React.FC<DweetProps> = ({
  id,
  userAvatar,
  userName,
  userHandle,
  timestamp,
  dweetText,
  images,
  likes,
  onLike,
}) => {
  const [previewImage, setPreviewImage] = useState('');
  const { user } = useDwitter();
  return (
    <>
      <Modal
        open={previewImage !== ''}
        title=""
        onClose={() => {
          setPreviewImage('');
        }}
      >
        <div className="my-2 rounded-lg bg-gray-300 dark:bg-gray-700">
          <img
            src={previewImage}
            alt=""
            className="h-[100%] w-[100%] rounded-lg"
          />
        </div>
      </Modal>
      <div className="border-b-[0.1px] border-gray-300  dark:border-gray-800">
        <div className="mt-auto flex gap-4 p-4 ">
          <img
            className="h-8 w-8 rounded-full bg-gray-300
            object-cover dark:bg-gray-700 lg:h-12 lg:w-12"
            src={userAvatar}
          />
          <div className="flex flex-col ">
            <div className="flex flex-row items-center justify-start gap-2">
              <p className="lg:text-md text-sm font-bold text-black dark:text-white">
                {userName}
              </p>
              <p className="my-0 text-xs font-thin text-gray-500 lg:text-sm ">
                @{userHandle}
              </p>
              <div className="flex h-[2px] w-[2px] items-center justify-center rounded-full bg-gray-500 dark:bg-gray-700"></div>
              <p className="my-0  text-xs font-thin text-gray-500 lg:text-sm ">
                {moment(timestamp).fromNow(true)}
              </p>
            </div>
            <div className="my-2">
              {/* preserve spaces and new lines in dweetText */}
              <p className="text-sm font-thin text-black dark:text-white">
                {dweetText.split('\n').map((line: string, i: number) => {
                  return (
                    <span key={i}>
                      {line.split(' ').map((word: string, j: number) => {
                        return (
                          <span
                            key={j}
                            className={`${
                              word.includes('#') || word.includes('@')
                                ? 'text-blue-500'
                                : ''
                            }`}
                          >
                            {word}
                            <span className="text-gray-500"> </span>
                          </span>
                        );
                      })}

                      <br />
                    </span>
                  );
                })}
              </p>
            </div>
            {images.length > 0 && (
              <div className="mb-4 flex w-fit flex-wrap items-start justify-start gap-4 lg:grid-cols-3">
                {images?.map((image, i) => (
                  <div className="relative h-[130px] w-[130px] rounded-lg bg-gray-300 dark:bg-gray-700 lg:h-[150px] lg:w-[150px]">
                    <img
                      key={i}
                      className="h-full w-full cursor-pointer rounded-lg object-cover"
                      src={image}
                      onClick={() => {
                        setPreviewImage(image);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full flex-row px-4 pb-4 sm:w-10/12">
          <img
            className="mr-4 h-0 w-8 rounded-full  object-cover md:w-12"
            src={userAvatar}
          />
          <div className="flex w-full flex-row items-start justify-between">
            <div className="flex items-center justify-start gap-3">
              {user && likes.includes(user?.wallet) ? (
                <IoMdHeart
                  fontSize={20}
                  className="block cursor-pointer font-thin text-red-500"
                  onClick={() => {
                    onLike(id);
                  }}
                />
              ) : (
                <IoMdHeartEmpty
                  fontSize={20}
                  className="block cursor-pointer font-thin text-gray-500"
                  onClick={() => {
                    onLike(id);
                  }}
                />
              )}
              <span className="my-0 text-sm font-thin text-gray-500">
                {likes.length}
              </span>
            </div>

            <div className="flex items-center justify-start gap-3">
              <FaRegComment
                fontSize={20}
                className="block cursor-pointer font-thin text-gray-500"
              />
              <span className="my-0 text-sm font-thin text-gray-500">0</span>
            </div>
            <div className="flex items-center justify-start gap-3">
              <AiOutlineRetweet
                fontSize={20}
                className="block cursor-pointer font-thin text-gray-500"
              />
              <span className="my-0 text-sm font-thin text-gray-500">0</span>
            </div>
            <div className="flex items-center justify-start gap-3">
              <FiShare
                fontSize={20}
                className="block cursor-pointer font-thin text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dweet;
