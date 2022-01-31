import type { NextPage } from 'next';
import { Layout } from '@/components/Layout';
import { NewProductForm } from '@/components/newProduct/NewProductForm';

const NewProduct: NextPage = () => {
  return (
    <Layout title='New Product' description='Sell product with Ecom ⚡'>
      <div className='flex items-center justify-center mt-10 mb-10'>
        <NewProductForm />
      </div>
    </Layout>
  );
};

export default NewProduct;
