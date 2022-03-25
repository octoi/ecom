import React from 'react';
import { ApolloError } from '@apollo/client';
import { ProductType } from '@/utils/types';
import { Product } from './Product';
import { productStore } from '@/state/product.state';
import { Downgraded } from '@hookstate/core';

interface Props {
  loading: boolean;
  error?: ApolloError;
}

export const Products: React.FC<Props> = ({ loading, error }) => {
  const products = productStore.attach(Downgraded).get();

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className='text-red-400'>{error?.message}</p>}
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {products.map((product: ProductType) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
