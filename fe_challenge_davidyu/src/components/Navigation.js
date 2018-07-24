/**
 * Nav.js - The navigation sidebar.
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
  background: #700;
  
  a {
    color:#fff;
  }
`;

const NavbarBrandStyle = styled(NavbarBrand)`
  @media (min-width: 800px) {
    margin-left: 70px;
  }

  margin-right: 90px !important;
  font-family: 'Roboto Slab', serif;
`;

export const Navigation = () => (
  <NavbarStyled expand="md">
    <NavbarBrandStyle href="/"><h3>BRoster</h3></NavbarBrandStyle>
    <NavbarToggler />
    <Collapse navbar>
      <Nav navbar>
        <NavItem>
          <NavLink href="/">Tabular view</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/">Timeline visualisation</NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </NavbarStyled>
);