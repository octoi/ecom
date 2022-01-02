import React from 'react';
import { Paths } from '@/types/constant.type';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { GuestUserRHS } from './GuestUserRHS';

export const Header = () => {
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
        <Nav>
          <GuestUserRHS />
        </Nav>
      </Container>
    </Navbar>
  );
};
