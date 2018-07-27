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
import { history } from '../store';

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
  color: #fff !important;
  margin-right: 90px !important;
  font-family: 'Roboto Slab', serif;
`;

const NavLinkStyle = styled(NavLink)`
  font-weight: 100;
  cursor: pointer;
  color: ${(props) => (
    props['data-link'] === (process.env.PUBLIC_URL + props.at)
  ) ? '#fff' : '#ffbcbc' }  !important;
  
  :hover {
    text-decoration: underline !important;
  }
`;

export const changeRoute = (href) => {
  return history.push(href);
}

export const Navigation = (props) => (
  <NavbarStyled expand="md">
    <NavbarBrandStyle>
      <h3>BRoster</h3>
    </NavbarBrandStyle>
    <NavbarToggler />
    <Collapse isOpen={true} navbar>
      <Nav navbar>
        
        <NavItem>
          <NavLinkStyle
            data-link={`${process.env.PUBLIC_URL}/`}
            onClick={() => changeRoute(`${process.env.PUBLIC_URL}/`)}
            at={props.atPage}
          >
            Tabular view
          </NavLinkStyle>
        </NavItem>
        
        <NavItem>
          <NavLinkStyle
            data-link={`${process.env.PUBLIC_URL}/timeline`}
            onClick={() => changeRoute(`${process.env.PUBLIC_URL}/timeline`)}
            at={props.atPage}
          >
            Timeline visualisation
          </NavLinkStyle>
        </NavItem>
        
      </Nav>
    </Collapse>
  </NavbarStyled>
);