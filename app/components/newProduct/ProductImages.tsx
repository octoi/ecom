import React, { useState } from 'react';
import { ImagePicker } from './ImagePicker';
import { ImageViewer } from './ImageViewer';

interface Props {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ProductImages: React.FC<Props> = () => {
  const [rawImageFiles, setRawImageFiles] = useState<any[]>([]);

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
          idx={idx}
          file={file}
          deleteImage={() => deleteImage(idx)}
        />
      ))}
      {rawImageFiles.length < 3 && (
        <ImagePicker
          imageFiles={rawImageFiles}
          setImageFiles={setRawImageFiles}
        />
      )}
    </div>
  );
};
