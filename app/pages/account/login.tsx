import type { NextPage } from 'next';
import { Layout } from '@/components/layout/Layout';
import { LoginForm } from '@/components/login/LoginForm';

const Login: NextPage = () => {
  return (
    <Layout title='Login' description='Login to Ecom'>
      <LoginForm />
    </Layout>
  );
};

export default Login;
