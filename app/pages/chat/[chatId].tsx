import type { GetServerSideProps, NextPage } from 'next';
import { Layout } from '@/components/Layout';
import { getApolloClient } from '@/utils/apollo';
import { GSSPRedirectData } from '@/utils/constants';
import { isValidEmail } from '@/utils/helper';
import { GET_CHAT, GET_TARGET_USER_DATA } from '@/components/chat/query';
import { NEW_CHAT } from '@/components/chat/mutation';
import { ChatType } from '@/utils/types';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Paths } from '@/utils/paths';
import { getUserData } from '@/state/user.state';

interface Props {
  chat?: ChatType;
  targetUserId: number;
}

const ChatPage: NextPage<Props> = ({ chat: responseChat, targetUserId }) => {
  const router = useRouter();
  const [chat, setChat] = useState(responseChat);
  const [newChat] = useMutation(NEW_CHAT);

  useEffect(() => {
    if (!targetUserId) return;

    newChat({ variables: { targetUserId } })
      .then(({ data }) => setChat(data?.newChat))
      .catch(() => router.push(Paths.notFound));
  }, []);

  const loggedInUser = getUserData();
  const targetUser =
    chat?.sender?.email === loggedInUser?.email ? chat?.receiver : chat?.sender;

  return <Layout title={targetUser?.name || 'Loading..'}></Layout>;
};

export default ChatPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const chatId: any = params?.chatId;

  if (!chatId) return GSSPRedirectData;

  const client = getApolloClient();

  if (isValidEmail(chatId)) {
    const userResponseData: any = await client.query({
      query: GET_TARGET_USER_DATA,
      variables: { email: chatId },
    });

    const userData = userResponseData?.data?.getUserDetails;
    const userId = parseInt(userData?.id);

    if (!userData || !userId) return GSSPRedirectData;

    return {
      props: {
        targetUserId: userId,
      },
    };

    // const newChatResponseData = await client.mutate({
    //   mutation: NEW_CHAT,
    //   variables: { targetUserId: userId },
    // });

    // const chatData = newChatResponseData.data?.newChat;

    // if (!newChatResponseData || !chatData) return GSSPRedirectData;

    // return {
    //   props: {
    //     chat: chatData,
    //   },
    // };
  }

  const chatResponseData: any = await client.query({
    query: GET_CHAT,
    variables: { chatId },
  });

  const chatData = chatResponseData.data?.getChat;

  if (!chatData) return GSSPRedirectData;

  return {
    props: {
      chat: chatData,
    },
  };
};
