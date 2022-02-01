import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TextInput, Button, toaster, Text } from 'evergreen-ui';
import { useState } from '@hookstate/core';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from './mutation';
import { setUser } from '@/utils/user';
import { Paths } from '@/utils/constants';

export const RegisterForm: React.FC = () => {
  const router = useRouter();

  const [registerUser] = useMutation(REGISTER_USER);

  const emailState = useState('');
  const nameState = useState('');
  const passwordState = useState('');
  const loadingState = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loadingState.set(true);

    const registerData = {
      name: nameState.get(),
      email: emailState.get(),
      password: passwordState.get(),
      profile: encodeURI(
        `https://avatars.dicebear.com/api/initials/${nameState.get()}.svg`
      ),
    };

    registerUser({ variables: registerData })
      .then(({ data }) => {
        const responseData = data?.register;
        setUser(responseData);

        toaster.success(`Welcome ${responseData?.name} to Ecom`, {
          duration: 5,
        });

        router.push(Paths.app);
      })
      .catch((err) => {
        toaster.danger('Oops something went wrong', {
          description: err?.message,
          duration: 5,
        });
      })
      .finally(() => {
        nameState.set('');
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
      <h1 className='text-3xl font-bold mb-5'>Register</h1>
      <TextInput
        value={nameState.get()}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          nameState.set(e.target.value)
        }
        placeholder='name'
        type='text'
        className='!w-full !h-12'
        size='large'
        required
      />
      <br />
      <TextInput
        value={emailState.get()}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          emailState.set(e.target.value)
        }
        placeholder='email'
        type='email'
        className='!w-full mt-2 !h-12'
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
        Register
      </Button>
      <Link href={Paths.login} passHref>
        <Text className='mt-2 cursor-pointer' color='muted'>
          Already have an account ? Login
        </Text>
      </Link>
    </form>
  );
};
