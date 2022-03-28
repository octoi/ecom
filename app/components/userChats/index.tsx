import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Avatar, Container, Table, Title } from '@mantine/core';
import { GET_USER_CHATS } from './query';
import { ChatType } from '@/utils/types';
import { getUserData } from '@/state/user.state';
import Link from 'next/link';
import { Paths } from '@/utils/paths';

export const UserChats = () => {
  const [chats, setChats] = useState<ChatType[]>([]);

  const { loading, error, data } = useQuery(GET_USER_CHATS);

  const loggedInUser = getUserData();

  useEffect(() => {
    if (data) {
      setChats(data?.getUserChats);
    }
  }, [data]);

  return (
    <Container p='lg'>
      <Title className='mb-5'>My Chats</Title>
      {loading && <p>Loading ...</p>}
      {error && <p className='text-red-400'>{error?.message}</p>}
      {chats.length > 0 && (
        <Table striped highlightOnHover verticalSpacing='md'>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {chats.map((chat) => {
              const targetUser =
                chat?.sender?.email === loggedInUser?.email
                  ? chat.sender
                  : chat.receiver;

              return (
                <Link
                  key={chat?.id}
                  passHref
                  href={Paths.chat + '/' + chat?.id}
                >
                  <tr className='cursor-pointer'>
                    <td>
                      <Avatar
                        src={targetUser?.profile}
                        alt={targetUser?.name}
                        className='rounded-full'
                      />
                    </td>
                    <td>{targetUser?.name}</td>
                    <td>{targetUser?.email}</td>
                  </tr>
                </Link>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
};
