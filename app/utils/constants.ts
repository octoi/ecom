import { Paths } from './paths';

export const GRAPHQL_ENDPOINT = 'http://localhost:5000/graphql';
export const FILE_API_ENDPOINT =
  process.env.FILE_API_ENDPOINT || 'http://localhost:8080';

// getServerSideProps redirect to 404 data
export const GSSPRedirectData = {
  redirect: {
    destination: Paths.notFound,
    permanent: false,
  },
  props: {},
};
