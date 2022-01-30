import { Layout } from '@/components/Layout';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Layout>
      <h1 className='text-2xl'>Hello World</h1>
    </Layout>
  );
};

export default Home;
