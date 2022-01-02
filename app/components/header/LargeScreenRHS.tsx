import Link from 'next/link';
import { Box, Button } from '@mui/material';
import { Paths } from '@/utils/constants';

export const LargeScreenRHS = () => {
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Link passHref href={Paths.login}>
        <Button
          variant='contained'
          className='bg-slate-800 font-medium hover:bg-slate-600 '
        >
          Login
        </Button>
      </Link>
      <Link passHref href={Paths.register}>
        <Button
          variant='contained'
          className='ml-2 bg-slate-800 font-medium hover:bg-slate-600 '
        >
          Register
        </Button>
      </Link>
    </Box>
  );
};
