import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TextInput, Button, toaster, Text } from 'evergreen-ui';
import { useState } from '@hookstate/core';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from './mutation';
import { setUser } from '@/utils/user';
import { Paths } from '@/utils/constants';

export const LoginForm: React.FC = () => {
  const router = useRouter();

  const [loginUser] = useMutation(LOGIN_USER);

  const emailState = useState('');
  const passwordState = useState('');
  const loadingState = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loadingState.set(true);

    const loginData = {
      email: emailState.get(),
      password: passwordState.get(),
    };

    loginUser({ variables: loginData })
      .then(({ data }) => {
        const responseData = data?.login;
        setUser(responseData);

        toaster.success(`Welcome back ${responseData?.name} to Ecom`, {
          duration: 5,
        });

        const route = router.query.next?.toString() || Paths.app;
        router.push(route);
      })
      .catch((err) => {
        toaster.danger('Oops something went wrong', {
          description: err?.message,
          duration: 5,
        });
      })
      .finally(() => {
        emailState.set('');
        passwordState.set('');
        loadingState.set(false);
      });
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className='w-full p-3 m-3 md:w-1/2 lg:w-1/3'
    >
      <h1 className='text-3xl font-bold mb-5'>Login</h1>
      <TextInput
        value={emailState.get()}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          emailState.set(e.target.value)
        }
        placeholder='email'
        type='email'
        className='!w-full !h-12'
        size='large'
        required
      />
      <br />
      <TextInput
        value={passwordState.get()}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          passwordState.set(e.target.value)
        }
        placeholder='password'
        type='password'
        className='!w-full mt-2 !h-12'
        size='large'
        required
      />
      <br />
      <Button
        className='mt-2 w-full !h-12'
        size='large'
        appearance='primary'
        isLoading={loadingState.get()}
      >
        Login
      </Button>
      <Link href={Paths.register} passHref>
        <Text className='mt-2 cursor-pointer' color='muted'>
          Dont have an account ? Register
        </Text>
      </Link>
    </form>
  );
};
