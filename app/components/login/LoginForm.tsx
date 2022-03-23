import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { useNotifications } from '@mantine/notifications';
import { LOGIN_USER } from './mutation';
import { setUser } from '@/utils/user';
import { Paths } from '@/utils/paths';
import {
  Container,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
} from '@mantine/core';

export const LoginForm = () => {
  const router = useRouter();
  const notifications = useNotifications();

  const [loginUser] = useMutation(LOGIN_USER);

  // states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false); // to show loading spinner

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const LoginData = {
      email,
      password,
    };

    loginUser({ variables: LoginData })
      .then(({ data }) => {
        const responseData = data?.login;
        setUser(responseData);

        notifications.showNotification({
          title: `Welcome back ${responseData?.name} to Ecom`,
          message: 'Logged in successfully',
          autoClose: 3000,
          color: 'teal',
        });

        const route = router.query.next?.toString() || Paths.app;
        router.push(route);
      })
      .catch((err) => {
        notifications.showNotification({
          title: 'Failed to login',
          message: err?.message,
          autoClose: 3000,
          color: 'red',
        });
      })
      .finally(() => {
        setEmail('');
        setPassword('');
        setLoading(false);
      });
  };

  return (
    <Container p='lg'>
      <Title>Login</Title>
      <Text className='mt-2 mb-5 flex items-center'>
        Dont have an account ?{' '}
        <Link href={Paths.register} passHref>
          <Text ml={5} weight={500} className='cursor-pointer'>
            Register
          </Text>
        </Link>
      </Text>
      <form onSubmit={handleFormSubmit}>
        <TextInput
          placeholder='hello@ecom.app'
          label='Your email'
          variant='filled'
          size='md'
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='mb-3'
          disabled={loading}
        />
        <PasswordInput
          placeholder='Password'
          label='Password'
          variant='filled'
          size='md'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='mb-5'
          disabled={loading}
        />
        <Button
          variant='default'
          size='md'
          type='submit'
          className='bg-indigo-500 w-full transition-all hover:bg-indigo-400 text-white'
          loading={loading}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};
