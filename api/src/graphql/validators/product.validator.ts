import { UserInputError } from 'apollo-server';
import { NewProductRequestArgs } from '../../types/request';

export const validateNewProductArgs = (
  args: NewProductRequestArgs
): NewProductRequestArgs => {
  if (
    !args.title ||
    !args.description ||
    !args.price ||
    !args.place ||
    !args.images ||
    args.images.length === 0
  ) {
    throw new UserInputError('required fields not found');
  }

  return args;
};

export const validateProductIdArgs = (args: any): { productId: string } => {
  if (!args.productId) {
    throw new UserInputError('required fields not found');
  }

  return args;
};
