/**
 * App.js - The main page container containing routes.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Routes } from './components/Routes';
import { Navigation } from './components/Navigation';
import { history } from './store';

// Parse state from Redux store to props.
const mapStateToProps = state => {
  return {
    shifts: state.shifts,
    config: state.config
  };
}

// Enable Redux store dispatch for dispatching an action.
const mapDispatchToProps = dispatch => {
  return {};
}

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <ConnectedRouter history={history}>
          <div>{Routes(this.props)}</div>
        </ConnectedRouter>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);