import { UserInputError } from 'apollo-server';
import { NewProductRequestArgs } from '../types/request';
import {
  getAllProducts,
  getOneProduct,
  newProduct,
} from '../models/product.model';

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

// takes product id and return corresponding product
export const getOneProductController = async (productId: string) => {
  const product: any = await getOneProduct(productId).catch((err) => {
    throw new UserInputError(err);
  });

  return product;
};
