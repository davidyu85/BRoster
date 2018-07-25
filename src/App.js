/**
 * App.js - The main page container containing routes.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { Navigation } from './components/Navigation';
import { Tabular } from './components/Tabular';
import { TimelineView } from './components/Timeline';
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

const routes = (props) => {
  const { shifts, config } = props;
  return (
    <Switch>
      
      <Route exact path="/" render={() => (
        <Tabular
          data={shifts}
          config={config}
        />
      )} 
      />
      
      <Route path="/timeline" render={() => (
        <TimelineView 
          data={shifts}
          defaultTimeStart={shifts[shifts.length - 1].end_time}
          defaultTimeEnd={shifts[0].start_time}
        />
      )} 
      />
      
    </Switch>
  );
};

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <ConnectedRouter history={history}>
          <div>{routes(this.props)}</div>
        </ConnectedRouter>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);