/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Modal } from '@mantine/core';
import 'react-alice-carousel/lib/alice-carousel.css';

interface Props {
  images: string[];
}

export const ImageSlider: React.FC<Props> = ({ images }) => {
  const [opened, setOpened] = useState(false);
  const [currentImage, setCurrentImage] = useState(images[0]);

  const imageItems = images.map((image, idx) => (
    <img
      key={idx}
      src={image}
      alt={idx.toString()}
      onDragStart={(e) => e.preventDefault()}
      onDoubleClick={() => {
        setCurrentImage(image);
        setOpened(true);
      }}
      className='w-full h-52 md:h-80 object-cover cursor-pointer'
    />
  ));

  return (
    <div className='w-full'>
      <AliceCarousel
        items={imageItems}
        disableButtonsControls
        infinite
        mouseTracking
        touchTracking
        renderDotsItem={(e) => (
          <div
            className={`w-3 h-3 mx-2 md:mx-5 rounded-full cursor-pointer transition-all hover:opacity-60 ${
              e.isActive ? 'bg-indigo-500' : 'bg-indigo-300'
            }`}
          />
        )}
      />

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title='Image Viewer'
        size='xl'
        centered
        overflow='inside'
      >
        <img src={currentImage} alt={currentImage} className='w-full' />
      </Modal>
    </div>
  );
};
