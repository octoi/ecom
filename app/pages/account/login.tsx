import type { NextPage } from 'next';
import { Layout } from '@/components/Layout';
import { LoginForm } from '@/components/login/LoginForm';

const Login: NextPage = () => {
  return (
    <Layout title='Login' description='Login to Ecom to sell & buy products'>
      <LoginForm />
    </Layout>
  );
};

export default Login;
