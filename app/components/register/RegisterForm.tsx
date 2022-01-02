import { useRouter } from 'next/router';
import { useState } from '@hookstate/core';
import { useMutation } from '@apollo/client';
import { Paths } from '@/utils/constants';
import { getUserAvatar, setUser } from '@/utils/user.util';
import { CircularProgress } from '@mui/material';
import { TextField } from '../shared/input/TextField';
import { REGISTER_USER } from './register.mutation';

export const RegisterForm = () => {
  const router = useRouter();

  const [registerUser] = useMutation(REGISTER_USER);

  const emailState = useState('');
  const nameState = useState('');
  const passwordState = useState('');
  const loadingState = useState(false);

  const handleRegisterForm = (e: React.FormEvent<HTMLFormElement>) => {
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
        console.log(responseData);
        setUser(responseData);

        alert(`Welcome ${responseData?.name} to Ecom`);
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
    <div className='p-5 w-full md:w-1/2 lg:w-1/3'>
      <form onSubmit={handleRegisterForm}>
        <h1 className='font-bold text-4xl'>Register</h1>
        <TextField
          type='text'
          placeholder='name'
          className='mt-8'
          value={nameState.get()}
          onChange={nameState.set}
          required
        />
        <TextField
          type='email'
          placeholder='email'
          className='mt-3'
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

        <p className='mt-4 opacity-80'>
          By registering you agree you our{' '}
          <a
            href={Paths.terms}
            className='font-medium underline decoration-slate-900'
          >
            Terms and Policies
          </a>
        </p>

        <button
          type='submit'
          className='w-full mt-3 bg-slate-900 p-3 rounded text-white text-xl transition-all hover:opacity-90'
        >
          {loadingState.get() && (
            <CircularProgress size={25} className='text-white' />
          )}
          {!loadingState.get() && 'Register'}
        </button>

        <p className='mt-3 opacity-80'>
          Already have an account ?{' '}
          <a
            href={Paths.login}
            className='font-medium underline decoration-slate-900'
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
};
