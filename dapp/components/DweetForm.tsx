import React, { useState } from 'react';
import { MdClose, MdOutlineImage } from 'react-icons/md';
import useDwitter from '../hooks/useDwitter';
import Button from './Button';
import FileUploader from './FileUploader';
import TextArea from './TextArea';

interface DweetFormProps {
  onSubmit: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: { dweetContent: string; dweetImages: string[] },
    callback: () => void
  ) => void;
  parentProps?: React.ComponentProps<'div'>;
}

const DweetForm: React.FC<DweetFormProps> = ({
  onSubmit,
  parentProps = {},
}) => {
  const { user } = useDwitter();
  const [state, setState] = useState<{
    dweetContent: string;
    dweetImages: string[];
  }>({
    dweetContent: '',
    dweetImages: [],
  });

  const { dweetContent, dweetImages } = state;
  return (
    <>
      <div {...parentProps}>
        <div className="flex flex-row items-start justify-start gap-5">
          <img
            className="h-8 w-8 rounded-full bg-gray-300 object-cover dark:bg-gray-700 md:h-12 md:w-12"
            src={user?.avatar}
          />
          <TextArea
            className="mb-2 border-b-[0.1px] border-gray-300 dark:border-gray-800"
            rows={5}
            placeholder="What's happening"
            value={dweetContent}
            onChange={(e) =>
              setState({
                ...state,
                dweetContent: e.target.value,
              })
            }
          />
        </div>

        {state.dweetImages.length > 0 && (
          <div className="z-50 ml-12 mb-4 flex w-fit flex-wrap items-start justify-start gap-4 md:ml-16 lg:grid-cols-3 ">
            {state.dweetImages?.map((image, i) => (
              <div className="relative h-[90px] w-[90px] rounded-lg bg-gray-300 dark:bg-gray-700 lg:h-[150px] lg:w-[150px]">
                <MdClose
                  className="absolute top-1 left-1 cursor-pointer rounded-full bg-gray-500 bg-opacity-50  text-white"
                  fontSize={24}
                  onClick={() => {
                    const newImages = state.dweetImages.filter(
                      (img) => img.toLowerCase() !== image.toLowerCase()
                    );
                    setState({
                      ...state,
                      dweetImages: newImages,
                    });
                  }}
                />
                <img
                  key={i}
                  className="h-full w-full rounded-lg object-cover"
                  src={image}
                />
              </div>
            ))}
          </div>
        )}
        <div className="relative flex w-full flex-row items-center justify-between">
          <div className="flex">
            <div className="mr-4 w-8 md:w-12" />{' '}
            <FileUploader
              uploadLabel={() => (
                <label htmlFor="dweet_img">
                  <MdOutlineImage fontSize={28} className="text-blue-500" />
                </label>
              )}
              id="dweet_img"
              setSrc={(src) => {
                setState({
                  ...state,
                  dweetImages: [...state.dweetImages, src],
                });
              }}
            />
          </div>
          <Button
            disabled={dweetContent.trim().length === 0}
            label="Dweet"
            className={'my-0 block min-w-[unset] text-[14px]'}
            onClick={(e) => {
              onSubmit(e, state, () => {
                setState({
                  dweetContent: '',
                  dweetImages: [],
                });
              });
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DweetForm;
