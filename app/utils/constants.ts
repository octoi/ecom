export const GRAPHQL_ENDPOINT =
  process.env.GRAPHQL_ENDPOINT || 'http://localhost:5000/graphql';

export enum Paths {
  register = '/account/register',
  login = '/account/login',
  app = '/',
  settings = '/account/settings',
  newProduct = '/product/new',
  user = '/user', // add `/{userEmail}`
  chat = '/chat',
  terms = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  notFound = '/404',
}
