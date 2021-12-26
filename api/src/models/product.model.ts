import { prismaClient } from './prisma';
import { NewProductRequestArgs } from '../types/request';

/*
  Usage: new product
  Implementation: adding new product to `Product` table
*/
export const newProduct = (data: NewProductRequestArgs, userId: number) => {
  return new Promise((resolve, reject) => {
    prismaClient.product
      .create({
        data: {
          ...data,
          ownerId: userId,
        },
        include: {
          owner: {
            select: {
              id: true,
              email: true,
              name: true,
              profile: true,
            },
          },
        },
      })
      .then(resolve)
      .catch(reject);
  });
};

/*
  Usage: get all products
  Implementation: getting products according to `createdAt` field in table
                  if page is available, return data for that page (pagination)
*/
export const getAllProducts = (page: number, whereData?: any) => {
  return new Promise((resolve, reject) => {
    const howManyToTake = page ? 20 : undefined; // each page will contain 20 products
    const howManyToSkip = page ? (page - 1) * 20 : undefined; // skipping products according to page

    prismaClient.product
      .findMany({
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
        where: whereData,
        take: howManyToTake,
        skip: howManyToSkip,
        include: {
          owner: {
            select: {
              id: true,
              email: true,
              name: true,
              profile: true,
            },
          },
        },
      })
      .then(resolve)
      .catch(reject);
  });
};

/*
  Usage: get one product
  Implementation: querying database to get one product with product id
*/
export const getOneProduct = (productId: string) => {
  return new Promise((resolve, reject) => {
    prismaClient.product
      .findUnique({
        where: { id: productId },
        include: {
          owner: {
            select: {
              id: true,
              email: true,
              name: true,
              profile: true,
            },
          },
        },
      })
      .then((data) => {
        if (!data) {
          reject(`Failed to find product with id ${productId}`);
        }
        resolve(data);
      })
      .catch(() => {
        reject('Failed to get product details');
      });
  });
};

/*
  Usage: delete product
  Implementation: 
    1. get product details
    2. check if product belongs to logged in user
    3. delete product
*/
export const deleteProduct = (productId: string, userId: number) => {
  return new Promise(async (resolve, reject) => {
    const product: any = await getOneProduct(productId).catch(reject);
    let productOwnerUserId = product?.ownerId;

    if (productOwnerUserId !== userId) {
      reject('Permission denied');
      return;
    }

    prismaClient.product
      .delete({ where: { id: productId } })
      .then(() => resolve('Product deleted successfully'))
      .catch(reject);
  });
};

/*
  Usage: search product
  Implementation: validate query for all fields in product
*/
export const searchProduct = (searchQuery: string) => {
  return new Promise((resolve, reject) => {
    let searchQueryAsNumber = isNaN(parseInt(searchQuery))
      ? 0
      : parseInt(searchQuery);

    prismaClient.product
      .findMany({
        where: {
          OR: [
            { title: { contains: searchQuery } },
            { description: { contains: searchQuery } },
            { id: { contains: searchQuery } },
            { price: { equals: searchQueryAsNumber } },
            { place: { contains: searchQuery } },
            { owner: { email: { contains: searchQuery } } },
            { owner: { name: { contains: searchQuery } } },
          ],
        },
        include: {
          owner: {
            select: {
              id: true,
              email: true,
              name: true,
              profile: true,
            },
          },
        },
        take: 20,
      })
      .then(resolve)
      .catch(reject);
  });
};
