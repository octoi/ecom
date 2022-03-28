import type { NextPage } from 'next';
import { Layout } from '@/components/Layout';
import { UserChats } from '@/components/userChats';

const ChatPage: NextPage = () => {
  return (
    <Layout title='Chats'>
      <UserChats />
    </Layout>
  );
};

export default ChatPage;
