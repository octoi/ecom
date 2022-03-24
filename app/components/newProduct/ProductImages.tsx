import React from 'react';
import { ImagePicker } from './ImagePicker';
import { ImageViewer } from './ImageViewer';

interface Props {
  images: any[];
  setImages: React.Dispatch<React.SetStateAction<any[]>>;
  disabled?: boolean;
}

export const ProductImages: React.FC<Props> = ({
  images: rawImageFiles,
  setImages: setRawImageFiles,
  disabled,
}) => {
  const deleteImage = (idx: number) => {
    const images = [...rawImageFiles];
    images.splice(idx, 1);
    setRawImageFiles(images);
  };

  return (
    <div className='mt-5 w-full flex h-52'>
      {rawImageFiles.map((file, idx) => (
        <ImageViewer
          key={idx}
          file={file}
          deleteImage={() => deleteImage(idx)}
        />
      ))}
      {rawImageFiles.length < 3 && (
        <ImagePicker
          imageFiles={rawImageFiles}
          setImageFiles={setRawImageFiles}
          disabled={disabled}
        />
      )}
    </div>
  );
};
