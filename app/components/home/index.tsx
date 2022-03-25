import React, { useState, useEffect } from 'react';
import { getProductStoreItems } from '@/state/product.state';
import { ProductType } from '@/utils/types';
import { Products } from './Products';
import { Search } from './Search';

export const HomeContent: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    setProducts(getProductStoreItems());
  }, []);

  return (
    <div>
      <Search setProducts={setProducts} />
      <Products products={products} />
    </div>
  );
};
