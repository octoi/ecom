import type { NextPage } from 'next';
import { Layout } from '@/components/layout/Layout';
import { RegisterForm } from '@/components/register/RegisterForm';

const Register: NextPage = () => {
  return (
    <Layout title='Register' description='Register to Ecom'>
      <RegisterForm />
    </Layout>
  );
};

export default Register;
