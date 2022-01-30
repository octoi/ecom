import type { NextPage } from 'next';
import { Layout } from '@/components/Layout';
import { LoginForm } from '@/components/login/LoginForm';

const Login: NextPage = () => {
  return (
    <Layout
      title='Login'
      description='Login to sell your products with Ecom ⚡'
    >
      <div className='mt-10 flex justify-center'>
        <LoginForm />
      </div>
    </Layout>
  );
};

export default Login;
