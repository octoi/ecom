import React from 'react';
import Link from 'next/link';
import { Paths } from '@/utils/constants';

export const Header = () => {
  return (
    <div className='bg-slate-50 px-4 py-6 flex items-center justify-between'>
      <div className='flex items-center'>
        <Link passHref href={Paths.home}>
          <p className='text-black font-medium text-xl cursor-pointer'>
            Ecom 🛒
          </p>
        </Link>
        <Link passHref href={Paths.terms}>
          <p className='text-black text-xl cursor-pointer ml-5 hidden lg:block'>
            Terms & Policies
          </p>
        </Link>
      </div>
      <div className='flex-grow mx-5'>
        <input
          type='text'
          placeholder='Search'
          className='w-full outline-none px-3 py-2 text-xl'
        />
      </div>
      <div className='items-center hidden md:flex'>
        <Link passHref href={Paths.login}>
          <button className='px-5 py-2 bg-slate-900 rounded text-white transition-all hover:opacity-80'>
            Login
          </button>
        </Link>
        <Link passHref href={Paths.register}>
          <button className='ml-2 px-5 py-2 bg-slate-900 rounded text-white transition-all hover:opacity-80'>
            Register
          </button>
        </Link>
      </div>
      <div className='flex items-center md:hidden'>
        <button className='ml-2 px-5 py-2 bg-slate-900 rounded text-white transition-all hover:opacity-80'>
          Popup
        </button>
      </div>
    </div>
  );
};
