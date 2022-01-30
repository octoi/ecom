import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className='mt-5 opacity-50 flex items-center justify-center'>
      &copy; {new Date().getFullYear()} Ecom, All Right Reserved
    </footer>
  );
};
