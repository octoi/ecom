import React from 'react';
import { State } from '@hookstate/core';
import { NewImagePicker } from './NewImagePicker';

interface Props {
  imagesState: State<string[]>;
}

export const ImagePicker: React.FC<Props> = (props) => {
  return (
    <div className='mt-5'>
      <NewImagePicker />
    </div>
  );
};
