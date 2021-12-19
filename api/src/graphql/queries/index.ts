import { GraphQLFieldConfig, GraphQLObjectType, GraphQLString } from 'graphql';

export const Queries = new GraphQLObjectType({
  name: 'Queries',
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
