import React from 'react';
import Link from 'next/link';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Paths } from '@/utils/constants';
import { SearchBar } from './SearchBar';
import { LargeScreenRHS } from './LargeScreenRHS';
import { SmallScreenRHS } from './SmallScreenRHS';

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' className='bg-slate-900'>
        <Toolbar>
          <Link href={Paths.home} passHref>
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ display: { xs: 'none', sm: 'block' } }}
              className='cursor-pointer'
            >
              ECOM
            </Typography>
          </Link>
          <SearchBar />
          <Box sx={{ flexGrow: 1 }} />
          <LargeScreenRHS />
          <SmallScreenRHS />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
