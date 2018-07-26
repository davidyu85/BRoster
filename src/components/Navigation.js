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

  :hover {
    color: #fff !important;
  }
`;

const NavLinkStyle = styled(NavLink)`
  font-weight: 100;
  color: ${(props) => (props.href === (process.env.PUBLIC_URL + props.at)) ? '#fff' : '#ffbcbc' }  !important;
  
  :hover {
    text-decoration: underline !important;
  }
`;

export const Navigation = (props) => (
  <NavbarStyled expand="md">
    <NavbarBrandStyle href={`${process.env.PUBLIC_URL}/`}><h3>BRoster</h3></NavbarBrandStyle>
    <NavbarToggler />
    <Collapse isOpen={true} navbar>
      <Nav navbar>
        <NavItem>
          <NavLinkStyle href={`${process.env.PUBLIC_URL}/`} at={props.atPage}>Tabular view</NavLinkStyle>
        </NavItem>
        <NavItem>
          <NavLinkStyle href={`${process.env.PUBLIC_URL}/timeline`} at={props.atPage}>Timeline visualisation</NavLinkStyle>
        </NavItem>
      </Nav>
    </Collapse>
  </NavbarStyled>
);