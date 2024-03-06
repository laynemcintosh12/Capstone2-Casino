import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './styles/NavBar.css';
import CasinoApi from './api';


function NavBar({ logout, user, setUser }) {
  const [balance, setBalance] = useState(false);

  useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  useEffect(() => {
    async function getBalance() {
      let balance = await CasinoApi.fetchBalance(user);
      setBalance(balance);
    }
    getBalance();
  },[user]);


  return (
    <Navbar bg="dark" variant='dark'>
      <Navbar.Brand as={NavLink} to="/">
        <h1>McIntosh Casino</h1>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        </Nav>
        <Nav className='mr-5'>
          {user ? (
            <>
              <Nav.Item className='text-light mr-3 mt-2'>{setBalance ? `Balance: ${balance}` : 'Loading...' }</Nav.Item>
              
              <NavDropdown className="text-center" title="Menu" id="basic-nav-dropdown" menuVariant="dark">
                  <NavDropdown.Item as={NavLink} to="/games">Games</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/account">Account</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} onClick={logout}>Log Out</NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <NavDropdown className="text-center" title="Menu" id="basic-nav-dropdown" menuVariant="dark">
                <NavDropdown.Item as={NavLink} to="/games">Games</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/login">Log In</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/signup">Sign Up</NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}


export default NavBar;
