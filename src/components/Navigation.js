/**
 * Navigation.js - The navigation sidebar.
 */
import React from 'react';
import styled from 'styled-components';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem
} from 'reactstrap';

const NavbarStyled = styled(Navbar)`
  position: fixed !important;
  width: 100%;
  background: #700; 
  a { color:#fff; }
`;

const NavbarBrandStyle = styled(NavbarBrand)`
  @media (min-width: 800px) {
    margin-left: 70px;
  }

  margin-right: 90px !important;
  font-family: 'Roboto Slab', serif;
`;

const NavLinkStyle = styled(NavLink)`
  font-weight: 100;
  color: #ffbcbc !important;
  
  :hover {
    text-decoration: underline;
    color: #fff !important;
  }
`;

export const Navigation = () => (
  <NavbarStyled expand="md">
    <NavbarBrandStyle href="/"><h3>BRoster</h3></NavbarBrandStyle>
    <NavbarToggler />
    <Collapse navbar>
      <Nav navbar>
        <NavItem>
          <NavLinkStyle href="/">Tabular view</NavLinkStyle>
        </NavItem>
        <NavItem>
          <NavLinkStyle href="/timeline">Timeline visualisation</NavLinkStyle>
        </NavItem>
      </Nav>
    </Collapse>
  </NavbarStyled>
);