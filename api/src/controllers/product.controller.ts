import { UserInputError } from 'apollo-server';
import { getAllProducts, newProduct } from '../models/product.model';
import { NewProductRequestArgs } from '../types/request';

// Takes `NewProductRequestArgs` and `userId`, return product data inside database
export const newProductController = async (
  args: NewProductRequestArgs,
  userId: number
) => {
  const product: any = await newProduct(args, userId).catch((err) => {
    throw new UserInputError(err);
  });

  return product;
};

// return all products
export const getAllProductsController = async (page: number) => {
  const products: any = await getAllProducts(page).catch((err) => {
    throw new UserInputError(err);
  });

  return products;
};
