import React from 'react';
import { useQuery } from '@apollo/client';
import { Products } from './Products';
import { GET_ALL_PRODUCTS } from './queries';
import { productStore } from '@/state/product.state';

export const HomeContent: React.FC = () => {
  const { loading, data, error } = useQuery(GET_ALL_PRODUCTS);

  if (data) {
    productStore.set(data.getAllProducts);
  }

  return (
    <div>
      <Products loading={loading} error={error} />
    </div>
  );
};
