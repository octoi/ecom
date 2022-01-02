import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from '@hookstate/core';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from './register.mutation';
import { getUserAvatar, setUser } from '@/utils/user.util';
import { Paths } from '@/types/constant.type';

export const RegisterForm = () => {
  const router = useRouter();
  const [registerUser] = useMutation(REGISTER_USER);

  const nameState = useState('');
  const emailState = useState('');
  const passwordState = useState('');
  const loadingState = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loadingState.set(true);

    registerUser({
      variables: {
        name: nameState.get(),
        email: emailState.get(),
        password: passwordState.get(),
        profile: getUserAvatar(nameState.get()),
      },
    })
      .then(({ data }) => {
        const responseData = data?.register;
        if (!responseData) throw new Error('Failed to fetch');
        setUser(responseData);

        router.push(Paths.home);
      })
      .catch((err) => {
        alert(`Failed to register, ${err.message}`);
      })
      .finally(() => {
        nameState.set('');
        emailState.set('');
        passwordState.set('');
        loadingState.set(false);
      });
  };

  return (
    <div className='w-full flex items-center justify-center mt-10 '>
      <div className='w-full p-5 md:w-1/2 lg:w-1/3'>
        <h1 className='text-4xl font-bold text-slate-900 mb-5'>Register</h1>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className='mb-3' controlId='formBasicText'>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={nameState.get()}
              onChange={(e) => nameState.set(e.target.value)}
            />
          </Form.Group>

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
              'Register'
            )}
          </Button>
          <p className='mt-3 text-slate-900'>
            Already have an account ?{' '}
            <Link href={Paths.login} passHref>
              <span className='font-medium underline decoration-slate-900 cursor-pointer'>
                Login
              </span>
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};
