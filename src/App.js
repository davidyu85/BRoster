/**
 * App.js - The main page container.
 */

import React, { Component } from 'react';
import { Navigation } from './components/Navigation';
import { Tabular } from './components/Tabular';
import store from './store';

const { getState } = store;

class App extends Component { 
  render() {
    return (
      <div>
        <Navigation />
        <Tabular
          data={getState().shifts}
          config={getState().config}
        />
      </div>
    )
  }
};

export default App;