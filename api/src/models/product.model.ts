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
export const getAllProducts = (page: number) => {
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
