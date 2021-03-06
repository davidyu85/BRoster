/**
 * App.js - The main page container containing Routes component.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Routes } from '../components/Routes';
import { Navigation } from '../components/Navigation';
import { history } from '../store';
import styled from 'styled-components';

// Because the navigation is in fixed position, need a few blank space
// so that content doesn't get overlaid.
const Spaces = styled.div`
  height: 65px;
`;

// Parse state from Redux store to props.
const mapStateToProps = state => state

class App extends Component {
  render() {
    return (
      <div>
        <Navigation atPage={this.props.router.location.pathname} />
        <Spaces />
        <ConnectedRouter history={history}>
          <div>{Routes(this.props)}</div>
        </ConnectedRouter>
      </div>
    )
  }
};

export default connect(mapStateToProps)(App);