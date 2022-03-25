import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ProductType } from '@/utils/types';
import { Product } from './Product';
import { appendData, productStore } from '@/state/product.state';
import { GET_ALL_PRODUCTS } from './queries';
import { Button } from '@mantine/core';

interface Props {
  products: ProductType[];
}

export const Products: React.FC<Props> = ({ products }) => {
  const [page, setPage] = useState(1);
  const [refetchLoading, setRefetchLoading] = useState(false);

  const { loading, data, error, refetch } = useQuery(GET_ALL_PRODUCTS);

  if (page === 1 && data) {
    productStore.set(data.getAllProducts);
  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className='text-red-400'>{error?.message}</p>}
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {products.map((product: ProductType) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      {data && data.getAllProducts.length !== 0 && (
        <Button
          className='mt-5'
          color='gray'
          variant='outline'
          loading={refetchLoading}
          onClick={() => {
            setRefetchLoading(true);
            refetch({ page: page + 1 })
              .then((data) => {
                appendData(data.data?.getAllProducts);
              })
              .finally(() => {
                setRefetchLoading(false);
              });
            setPage(page + 1);
          }}
        >
          Load More
        </Button>
      )}
    </div>
  );
};
