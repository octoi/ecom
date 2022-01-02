import React from 'react';
import { useRouter } from 'next/router';
import { useState } from '@hookstate/core';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from './login.mutation';
import { setUser } from '@/utils/user.util';
import { Paths } from '@/types/constant.type';

export const LoginForm = () => {
  const router = useRouter();
  const [loginUser] = useMutation(LOGIN_USER);

  const emailState = useState('');
  const passwordState = useState('');
  const loadingState = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loadingState.set(true);

    loginUser({
      variables: {
        email: emailState.get(),
        password: passwordState.get(),
      },
    })
      .then(({ data }) => {
        const responseData = data?.login;
        setUser(responseData);

        router.push(Paths.home);
      })
      .catch((err) => {
        alert(`Failed to login, ${err.message}`);
      })
      .finally(() => {
        emailState.set('');
        passwordState.set('');
        loadingState.set(false);
      });
  };

  return (
    <div className='w-full flex items-center justify-center mt-10 '>
      <div className='w-full p-5 md:w-1/2 lg:w-1/3'>
        <h1 className='text-4xl font-bold text-slate-900 mb-5'>Login</h1>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={emailState.get()}
              onChange={(e) => emailState.set(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-5' controlId='formBasicPassword'>
            <Form.Control
              type='password'
              placeholder='Password'
              value={passwordState.get()}
              onChange={(e) => passwordState.set(e.target.value)}
            />
          </Form.Group>
          <Button
            variant='primary'
            type='submit'
            className='text-blue-500 w-full hover:text-white'
          >
            {loadingState.get() ? (
              <Spinner
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
            ) : (
              'Login'
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
};
