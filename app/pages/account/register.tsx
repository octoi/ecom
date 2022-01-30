import type { NextPage } from 'next';
import { Layout } from '@/components/Layout';
import { RegisterForm } from '@/components/register/RegisterForm';

const Register: NextPage = () => {
  return (
    <Layout
      title='Register'
      description='Register to sell your products with Ecom ⚡'
    >
      <div className='mt-10 flex justify-center'>
        <RegisterForm />
      </div>
    </Layout>
  );
};

export default Register;
