import React, { useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './styles/NavBar.css';

function NavBar({ logout, user, setUser, balance, setBalance }) {
  

  useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  useEffect(() => {
    setBalance(balance);
  }, [setBalance, balance]);

  return (
      <Navbar bg="dark" variant='dark' style={{ padding: '5px 10px', fontSize: '16px' }}> {/* Adjusted padding and font size */}
        <Navbar.Brand as={NavLink} to="/">
          <h1 style={{ fontSize: '24px', margin: 0 }}>McIntosh Casino</h1> {/* Adjusted font size and margin */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Nav className='mr-3'>
            {user ? (
              <>
                <Nav.Item className='text-light mr-3 mt-2'>{balance ? `Balance: ${balance}` : 'Loading...' }</Nav.Item>
                
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


