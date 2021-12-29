import { GraphQLObjectType } from 'graphql';
import { DELETE_PRODUCT, NEW_PRODUCT } from './product.mutation';
import { LOGIN, REGISTER, UPDATE_USER } from './user.mutation';
import { NEW_CHAT } from './chats.mutation';

export const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    // USER
    register: REGISTER,
    login: LOGIN,
    updateUser: UPDATE_USER,

    // PRODUCT
    newProduct: NEW_PRODUCT,
    deleteProduct: DELETE_PRODUCT,

    // CHAT
    newChat: NEW_CHAT,
  }),
});
