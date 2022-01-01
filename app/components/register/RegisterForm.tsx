import { TextField } from '../shared/input/TextField';
import { useState } from '@hookstate/core';
import { Paths } from '@/utils/constants';

export const RegisterForm = () => {
  const emailState = useState('');
  const nameState = useState('');
  const passwordState = useState('');

  return (
    <div className='bg-slate-50 p-5 w-full md:w-1/2 lg:w-1/3'>
      <h1 className='font-bold text-2xl'>Register</h1>
      <TextField
        type='text'
        placeholder='name'
        className='mt-6'
        value={nameState.get()}
        onChange={nameState.set}
      />
      <TextField
        type='email'
        placeholder='email'
        value={emailState.get()}
        onChange={emailState.set}
      />
      <TextField
        type='password'
        placeholder='password'
        value={passwordState.get()}
        onChange={passwordState.set}
      />

      <p className='mt-3 opacity-80'>
        By registering you agree you our{' '}
        <a
          href={Paths.terms}
          className='font-medium underline decoration-slate-900'
        >
          Terms and Policies
        </a>
      </p>

      <button className='w-full mt-3 bg-slate-900 p-3 rounded text-white text-xl transition-all hover:opacity-80'>
        Register
      </button>
    </div>
  );
};
