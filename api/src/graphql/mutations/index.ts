import { GraphQLObjectType } from 'graphql';
import { LOGIN, REGISTER } from './user.mutation';

export const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    register: REGISTER,
    login: LOGIN,
  }),
});
