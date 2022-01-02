import React from 'react';
import Link from 'next/link';
import { Paths } from '@/types/constant.type';
import { Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { UserType } from '@/types/user.type';

export const LoggedInUserRHS: React.FC<{ user: UserType }> = ({ user }) => {
  return (
    <div>
      <Dropdown className='d-inline mx-2'>
        <Dropdown.Toggle id='dropdown-autoclose-true'>
          {user.name}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href='#'>Menu Item</Dropdown.Item>
          <Dropdown.Item href='#'>Menu Item</Dropdown.Item>
          <Dropdown.Item href='#'>Menu Item</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
