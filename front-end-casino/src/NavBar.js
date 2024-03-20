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
      <Navbar bg="dark" variant='dark' style={{ padding: '5px 10px', fontSize: '16px' }}> 
        <Navbar.Brand as={NavLink} to="/">
          <h1 style={{ fontSize: '24px', margin: 0 }}>McIntosh Casino</h1> 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Nav className='mr-3'>
            {user ? (
              <>

                <Nav.Item as={NavLink} to="/trivia">
                  <img
                    src="https://cdn.pixabay.com/photo/2012/04/24/13/16/money-40015_1280.png"
                    alt="Trivia"
                    style={{ width: '20px', marginRight: '20px', marginTop: '10px', cursor: 'pointer' }}
                  />
                </Nav.Item>

                <Nav.Item className='text-light mr-3 mt-2'>{balance ? `Balance: ${balance}` : 'Loading...' }</Nav.Item>
                
                <NavDropdown className="text-center" title="Menu" id="basic-nav-dropdown" menuVariant="dark">
                    <NavDropdown.Item as={NavLink} to="/profile">Account</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} onClick={logout}>Log Out</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <NavDropdown className="text-center" title="Menu" id="basic-nav-dropdown" menuVariant="dark">
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


