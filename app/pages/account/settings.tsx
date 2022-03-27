import type { NextPage } from 'next';
import { Layout } from '@/components/Layout';
import { EditUser } from '@/components/settings/EditUser';
import { Container, Title } from '@mantine/core';
const SettingsPage: NextPage = () => {
  return (
    <Layout title='Settings'>
      <Container p='lg'>
        <Title>Settings</Title>
        <EditUser />
      </Container>
    </Layout>
  );
};

export default SettingsPage;
