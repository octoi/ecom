import { createState, Downgraded } from '@hookstate/core';
import { ProductType } from '@/utils/types';

export const productStore = createState<ProductType[]>([]);

export const getProductStoreItems = () => productStore.attach(Downgraded).get();

export const appendData = (data: ProductType[]) => {
  const recentData = getProductStoreItems();
  const newData = [...recentData, ...data];
  productStore.set(newData);
};
