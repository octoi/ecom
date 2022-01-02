import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Paths } from '@/types/constant.type';
import { userStore } from '@/states/user.state';
import { GuestUserRHS } from './GuestUserRHS';
import { LoggedInUserRHS } from './LoggedInUserRHS';

export const Header = () => {
  const user = userStore.get();

  return (
    <Navbar bg='light'>
      <Container>
        <Navbar.Brand href={Paths.home}>Ecom</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto hidden md:flex items-center'>
            <Nav.Link href={Paths.home}>Home</Nav.Link>
            <Nav.Link href={Paths.terms}>Terms</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav>{user ? <LoggedInUserRHS user={user} /> : <GuestUserRHS />}</Nav>
      </Container>
    </Navbar>
  );
};
