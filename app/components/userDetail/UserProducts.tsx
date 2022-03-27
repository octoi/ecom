import React, { useEffect, useState } from 'react';
import { ProductType } from '@/utils/types';
import { useQuery } from '@apollo/client';
import { GET_USER_PRODUCTS } from './query';
import { Product } from '../home/Product';
import { Button } from '@mantine/core';

interface Props {
  email: string;
}

export const UserProducts: React.FC<Props> = ({ email }) => {
  const [page, setPage] = useState(1);
  const [refetchLoading, setRefetchLoading] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);

  const { loading, data, error, refetch } = useQuery(GET_USER_PRODUCTS, {
    variables: { email, page },
  });

  useEffect(() => {
    if (page === 1 && data) {
      setProducts(data.getAllUserProducts);
    }
  }, [data, page]);

  return (
    <div className='mt-5'>
      {loading && <p>Loading...</p>}
      {error && <p className='text-red-400'>{error?.message}</p>}
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {products.map((product: ProductType) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      {data && data?.getAllUserProducts?.length !== 0 && (
        <Button
          className='mt-5'
          color='gray'
          variant='outline'
          loading={refetchLoading}
          onClick={() => {
            setRefetchLoading(true);
            refetch({ page: page + 1 })
              .then((data: any) => {
                const responseProducts = data.data?.getAllProducts;
                if (responseProducts) {
                  const allProducts = [...products, ...responseProducts];
                  setProducts(allProducts);
                }
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
