import { TextField } from '../shared/input/TextField';
import { useState } from '@hookstate/core';

export const LoginForm = () => {
  const emailState = useState('');
  const passwordState = useState('');

  return (
    <div className='bg-slate-50 p-5 w-full md:w-1/2 lg:w-1/3'>
      <h1 className='text-slate-900 font-bold text-2xl'>Login</h1>
      <TextField
        type='email'
        placeholder='email'
        className='mt-6'
        value={emailState.get()}
        onChange={emailState.set}
      />
      <TextField
        type='password'
        placeholder='password'
        value={passwordState.get()}
        onChange={passwordState.set}
      />
      <button className='w-full mt-2 bg-slate-900 p-3 rounded text-white text-xl transition-all hover:opacity-80'>
        Login
      </button>
    </div>
  );
};
