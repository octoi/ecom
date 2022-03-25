import { createState } from '@hookstate/core';
import { ProductType } from '@/utils/types';

export const productStore = createState<ProductType[]>([]);
