import type { NextPage } from 'next';
import { Layout } from '@/components/Layout';
import { EditUser } from '@/components/settings/EditUser';
import { Container, Title } from '@mantine/core';
import { MyProducts } from '@/components/settings/MyProducts';

const SettingsPage: NextPage = () => {
  return (
    <Layout title='Settings'>
      <Container p='lg'>
        <Title className='mb-10'>Settings</Title>
        <EditUser />
        <Title order={3} className='my-5'>
          My Products
        </Title>
        <MyProducts />
      </Container>
    </Layout>
  );
};

export default SettingsPage;
