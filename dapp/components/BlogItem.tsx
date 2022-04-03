import Image from 'next/image';
import React from 'react';

const BlogItem: React.FC<{
  blog: {
    id: string;
    title: string;
    description: string;
    subtitle: {
      text: string;
      duration: number;
    };
    tags: string[];
    image: string;
    link: string;
  };
}> = ({ blog }) => {
  return (
    <div
      className="flex cursor-pointer flex-row items-start justify-between p-4 transition-all duration-200 hover:bg-gray-200 hover:dark:bg-gray-800"
      onClick={() => {
        window.location.href = blog.link;
      }}
    >
      <div className="flex w-3/4 flex-col items-start justify-start pr-4">
        <div className=" flex flex-row items-center justify-start gap-1 text-[14px] font-thin text-gray-500 ">
          <small>{blog?.subtitle.text}</small>
          <div className="flex h-[2px] w-[2px] items-center justify-center rounded-full bg-gray-500 dark:bg-gray-700"></div>
          <small>{blog?.subtitle.duration} min read</small>
        </div>
        <h1 className="font-bold">{blog?.title}</h1>
        <div className="tl-2 flex flex-row items-center justify-start gap-2 font-thin text-gray-500 ">
          <small>{blog?.description}</small>
        </div>
      </div>
      <div className="w-1/4">
        <Image
          quality={100}
          src={blog?.image || ''}
          alt={blog?.title}
          width={'100%'}
          height={'100%'}
          className="rounded-md object-cover"
        />
      </div>
    </div>
  );
};

export default BlogItem;
