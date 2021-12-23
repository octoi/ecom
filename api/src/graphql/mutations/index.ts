import { GraphQLObjectType } from 'graphql';
import { LOGIN, REGISTER, UPDATE_USER } from './user.mutation';

export const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    register: REGISTER,
    login: LOGIN,
    updateUser: UPDATE_USER,
  }),
});
