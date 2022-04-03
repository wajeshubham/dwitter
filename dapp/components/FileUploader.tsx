import { create } from 'ipfs-http-client';
import React from 'react';

interface FileUploaderProps {
  setSrc: (src: string) => void;
  id: string;
  uploadLabel: () => JSX.Element;
}

const ipfsClient = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',
});

const FileUploader: React.FC<FileUploaderProps> = ({
  setSrc,
  id,
  uploadLabel,
}) => {
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;
    try {
      const added = await ipfsClient.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setSrc(url);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  };

  return (
    <>
      <input
        className="hidden"
        type="file"
        id={id}
        onChange={(e) => {
          onChange(e);
          e.target.value = '';
          e.target.files = null;
        }}
      />
      {uploadLabel()}
    </>
  );
};

export default FileUploader;
