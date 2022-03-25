import React, { useState, useEffect } from 'react';
import { productStore } from '@/state/product.state';
import { ProductType } from '@/utils/types';
import { Products } from './Products';
import { Search } from './Search';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from './queries';

export const HomeContent: React.FC = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<ProductType[]>([]);

  const { loading, data, error, refetch } = useQuery(GET_ALL_PRODUCTS);

  useEffect(() => {
    if (page === 1 && data) {
      productStore.set(data.getAllProducts);
      setProducts(data.getAllProducts);
    }
  }, [data, page]);

  return (
    <div>
      <Search setProducts={setProducts} />
      <Products
        products={products}
        page={page}
        setPage={setPage}
        loading={loading}
        data={data}
        refetch={refetch}
        error={error}
      />
    </div>
  );
};
