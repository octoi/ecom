import { GraphQLObjectType } from 'graphql';
import { REGISTER } from './user.mutation';

export const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    register: REGISTER,
  }),
});
