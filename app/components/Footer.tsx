import React from 'react';
import { Text } from 'evergreen-ui';

export const Footer: React.FC = () => {
  return (
    <footer className='mt-5 opacity-50 flex items-center justify-center'>
      <Text color='muted'>
        &copy; {new Date().getFullYear()} Ecom, All Right Reserved
      </Text>
    </footer>
  );
};
