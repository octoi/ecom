import { useRouter } from 'next/router';
import { TextField } from '../shared/input/TextField';
import { useState } from '@hookstate/core';
import { Paths } from '@/utils/constants';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from './login.mutation';
import { setUser } from '@/utils/user.util';
import { CircularProgress } from '@mui/material';

export const LoginForm = () => {
  const router = useRouter();

  const [loginUser] = useMutation(LOGIN_USER);

  const emailState = useState('');
  const passwordState = useState('');
  const loadingState = useState(false);

  const handleLoginForm = (e: React.FormEvent<HTMLFormElement>) => {
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
        console.log(responseData);
        setUser(responseData);

        router.push(Paths.home);
        alert(`Welcome back ${responseData?.name} to Ecom`);
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
    <form className='p-5 w-full md:w-1/2 lg:w-1/3' onSubmit={handleLoginForm}>
      <h1 className='text-slate-900 font-bold text-4xl'>Login</h1>
      <TextField
        type='email'
        placeholder='email'
        className='mt-8'
        value={emailState.get()}
        onChange={emailState.set}
        required
      />
      <TextField
        type='password'
        placeholder='password'
        className='mt-3'
        value={passwordState.get()}
        onChange={passwordState.set}
        required
      />
      <button
        type='submit'
        className='w-full mt-8 bg-slate-900 p-3 rounded text-white text-xl transition-all hover:opacity-90 flex items-center justify-center'
      >
        {loadingState.get() && (
          <CircularProgress size={25} className='text-white' />
        )}
        {!loadingState.get() && 'Login'}
      </button>
      <p className='mt-3 opacity-80'>
        Dont have an account ?{' '}
        <a
          href={Paths.register}
          className='font-medium underline decoration-slate-900'
        >
          Register
        </a>
      </p>
    </form>
  );
};
