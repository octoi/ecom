import React from 'react';
import Link from 'next/link';
import { Container, Text, Header as MantineHeader } from '@mantine/core';
import { Paths } from '@/utils/paths';
import { ColorSchemeToggler } from './ColorSchemeToggler';
import { MenuButton } from './MenuButton';

export const Header: React.FC = () => {
  return (
    <MantineHeader height={70}>
      <Container p='md' fluid className='flex justify-between items-center'>
        <Link href={Paths.app} passHref>
          <Text size='xl' weight='bold' className='cursor-pointer'>
            Ecom
          </Text>
        </Link>

        <div className='flex items-center'>
          <ColorSchemeToggler />
          <MenuButton />
        </div>
      </Container>
    </MantineHeader>
  );
};
