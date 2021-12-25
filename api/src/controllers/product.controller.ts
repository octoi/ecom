import { UserInputError } from 'apollo-server';
import { NewProductRequestArgs } from '../types/request';
import {
  deleteProduct,
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

// Takes product id and return corresponding product
export const getOneProductController = async (productId: string) => {
  const product: any = await getOneProduct(productId).catch((err) => {
    throw new UserInputError(err);
  });

  return product;
};

// Takes productId, userId and delete product accordingly
export const deleteProductController = async (
  productId: string,
  userId: number
) => {
  const message: any = await deleteProduct(productId, userId).catch((err) => {
    throw new UserInputError(err);
  });

  return message;
};

// Takes user email and return all products belong to that user
export const getAllUserProducts = async (page: number, email: string) => {
  let whereData = { owner: { email } };

  const products: any = await getAllProducts(page, whereData).catch((err) => {
    throw new UserInputError(err);
  });

  return products;
};
