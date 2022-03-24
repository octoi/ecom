import { Layout } from '@/components/Layout';
import { NewProduct } from '@/components/newProduct';
import type { NextPage } from 'next';

const NewProductPage: NextPage = () => {
  return (
    <Layout title='Sell' description='Lets sell your products with others'>
      <NewProduct />
    </Layout>
  );
};

export default NewProductPage;
