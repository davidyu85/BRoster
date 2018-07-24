/**
 * App.js - The main page container.
 */

import React, { Component } from 'react';
import { Navigation } from './components/Navigation';
import { Tabular } from './components/Tabular';
import { getRequiredData } from './apis';
import { loadAllShifts } from './actions';
import store from './store';

const { getState, dispatch } = store;

class App extends Component {
  componentWillMount() {
    getRequiredData()
      .then((response) => {
        dispatch(loadAllShifts(response.data));
      });
  }
  
  render() {
    return (
      <div>
        <Navigation />
        <Tabular data={getState().shifts} />
      </div>
    )
  }
};

export default App;