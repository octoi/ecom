import React from 'react';
import Link from 'next/link';
import { Box, IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material';
import {
  MoreVert as MoreIcon,
  Login as LoginIcon,
  AppRegistration as RegisterIcon,
  Gavel as TermsIcon,
} from '@mui/icons-material';
import { Paths } from '@/utils/constants';

export const SmallScreenRHS = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size='large'
        aria-label='show more'
        aria-haspopup='true'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color='inherit'
      >
        <MoreIcon />
      </IconButton>

      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link href={Paths.login} passHref>
          <MenuItem>
            <ListItemIcon>
              <LoginIcon fontSize='small' />
            </ListItemIcon>
            Login
          </MenuItem>
        </Link>

        <Link href={Paths.register} passHref>
          <MenuItem>
            <ListItemIcon>
              <RegisterIcon fontSize='small' />
            </ListItemIcon>
            Register
          </MenuItem>
        </Link>

        <Link href={Paths.terms} passHref>
          <MenuItem>
            <ListItemIcon>
              <TermsIcon fontSize='small' />
            </ListItemIcon>
            Terms & Policies
          </MenuItem>
        </Link>
      </Menu>
    </Box>
  );
};
