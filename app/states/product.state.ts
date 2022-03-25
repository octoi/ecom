import { createState, Downgraded } from '@hookstate/core';
import { ProductType } from '@/utils/types';

export const productStore = createState<ProductType[]>([]);

export const appendData = (data: ProductType[]) => {
  const recentData = productStore.attach(Downgraded).get();
  const newData = [...recentData, ...data];
  productStore.set(newData);
};
