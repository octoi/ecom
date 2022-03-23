import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { useNotifications } from '@mantine/notifications';
import { REGISTER_USER } from './mutation';
import { setUser } from '@/utils/user';
import { Paths } from '@/utils/paths';
import { getUserAvatar } from '@/utils/avatars';
import {
  Container,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
} from '@mantine/core';

export const RegisterForm = () => {
  const router = useRouter();
  const notifications = useNotifications();

  const [registerUser] = useMutation(REGISTER_USER);

  // states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false); // to show loading spinner

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const registerData = {
      name,
      email,
      password,
      profile: getUserAvatar(name),
    };

    registerUser({ variables: registerData })
      .then(({ data }) => {
        const responseData = data?.register;
        setUser(responseData);

        notifications.showNotification({
          title: `Welcome ${name} to Ecom`,
          message: 'Registered an account successfully',
          autoClose: 3000,
          color: 'teal',
        });

        router.push(Paths.app);
      })
      .catch((err) => {
        notifications.showNotification({
          title: 'Failed to register account',
          message: err?.message,
          autoClose: 3000,
          color: 'red',
        });
      })
      .finally(() => {
        setName('');
        setEmail('');
        setPassword('');
        setLoading(false);
      });
  };

  return (
    <Container p='lg'>
      <Title>Register</Title>
      <Text className='mt-2 mb-5 flex items-center'>
        Already have an account ?{' '}
        <Link href={Paths.login} passHref>
          <Text ml={5} weight={500} className='cursor-pointer'>
            Login
          </Text>
        </Link>
      </Text>
      <form onSubmit={handleFormSubmit}>
        <TextInput
          placeholder='Your name'
          label='Full name'
          variant='filled'
          size='md'
          type='text'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='mb-3'
          disabled={loading}
        />
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
          Register
        </Button>
      </form>
    </Container>
  );
};
