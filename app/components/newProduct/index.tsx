import React, { useState } from 'react';
import { useNotifications } from '@mantine/notifications';
import { uploadImages } from './imageUpload';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { Paths } from '@/utils/paths';
import { ProductImages } from './ProductImages';
import { NEW_PRODUCT } from './mutation';
import {
  Button,
  Container,
  NumberInput,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';

export const NewProduct: React.FC = () => {
  const router = useRouter();
  const notifications = useNotifications();

  const [newProduct] = useMutation(NEW_PRODUCT);

  // states
  const [images, setImages] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [place, setPlace] = useState('');
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    if (images.length === 0) {
      notifications.showNotification({
        title: 'No images found',
        message: 'You cant sell a product without at least 1 image',
        autoClose: 3000,
        color: 'red',
      });
      return;
    }

    setLoading(true);

    const uploadedImages: any = await uploadImages(images).catch((err) => {
      notifications.showNotification({
        title: 'Failed to upload image',
        message: err,
        autoClose: 3000,
        color: 'red',
      });
    });

    if (!uploadedImages) return;
    setImages(uploadedImages);

    const newProductData = {
      title,
      description,
      place,
      price,
      images: uploadedImages,
    };

    newProduct({ variables: newProductData })
      .then(() => {
        notifications.showNotification({
          title: 'Lets wait until someone wants it..',
          message: 'Your product submitted successfully',
          autoClose: 3000,
          color: 'teal',
        });

        router.push(Paths.app);
      })
      .catch((err) => {
        notifications.showNotification({
          title: 'Failed to submit product',
          message: err?.message,
          autoClose: 3000,
          color: 'red',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container p='lg'>
      <Title>Sell New Product</Title>
      <ProductImages images={images} setImages={setImages} disabled={loading} />
      <form onSubmit={handleFormSubmit} className='mt-5'>
        <TextInput
          placeholder='Used macbook'
          label='Product title'
          variant='filled'
          size='md'
          type='text'
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='mb-3'
          disabled={loading}
        />
        <Textarea
          placeholder='Awesome functional macbook..'
          label='Description'
          variant='filled'
          size='md'
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='mb-3'
          disabled={loading}
        />
        <NumberInput
          placeholder='4000'
          label='Price'
          variant='filled'
          size='md'
          required
          defaultValue={price}
          onChange={(p) => setPrice(p || 0)}
          className='mb-3'
          disabled={loading}
        />
        <TextInput
          placeholder='Mountain View, California, US'
          label='Place'
          variant='filled'
          size='md'
          type='text'
          required
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className='mb-3'
          disabled={loading}
        />
        <Button
          variant='default'
          size='md'
          type='submit'
          className='bg-indigo-500 w-full transition-all hover:bg-indigo-400 text-white'
          loading={loading}
        >
          Sell My Product
        </Button>
      </form>
    </Container>
  );
};
