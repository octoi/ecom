import { Layout } from '@/components/core/Layout';
import { RegisterForm } from '@/components/register/RegisterForm';
import type { NextPage } from 'next';

const RegisterPage: NextPage = () => {
  return (
    <Layout title='Register' description='Get started using Ecom'>
      <div className='flex justify-center mt-5'>
        <RegisterForm />
      </div>
    </Layout>
  );
};

export default RegisterPage;
