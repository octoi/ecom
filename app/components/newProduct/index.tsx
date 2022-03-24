import React, { useState } from 'react';
import { Container, Title } from '@mantine/core';
import { ProductImages } from './ProductImages';

export const NewProduct: React.FC = () => {
  // states
  const [images, setImages] = useState<string[]>([]);

  return (
    <Container p='lg'>
      <Title>Sell New Product</Title>
      <ProductImages images={images} setImages={setImages} />
    </Container>
  );
};
