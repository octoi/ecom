import { Layout } from '@/components/core/Layout';
import { LoginForm } from '@/components/login/LoginForm';
import type { NextPage } from 'next';

const LoginPage: NextPage = () => {
  return (
    <Layout title='Login' description='Login to ecom'>
      <div className='flex justify-center mt-5'>
        <LoginForm />
      </div>
    </Layout>
  );
};

export default LoginPage;
