import { GraphQLFieldConfig, GraphQLObjectType, GraphQLString } from 'graphql';

export const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    hello,
  }),
});

let hello: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLString,
  resolve() {
    return 'hello';
  },
};
