import type { NextPage } from 'next';
import { Layout } from '@/components/Layout';
import { HomeContent } from '@/components/home';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <HomeContent />
    </Layout>
  );
};

export default HomePage;
