import React from 'react';
import { Heading } from 'evergreen-ui';
import { ImagePicker } from './imagePicker/ImagePicker';
import { useState } from '@hookstate/core';

export const NewProductForm: React.FC = () => {
  // New Product data
  const imagesState = useState<string[]>([]);

  return (
    <div className='w-full p-3 m-3 md:w-1/2 rounded'>
      <Heading is='h1' className='!text-xl'>
        New Product
      </Heading>
      <ImagePicker imagesState={imagesState} />
    </div>
  );
};
