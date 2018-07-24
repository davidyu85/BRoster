/**
 * App.js - The main page container.
 */

import React, { Component } from 'react';
import { Navigation } from './components/Navigation';
import { getRequiredData } from './apis';

class App extends Component {
  componentWillMount() {
    getRequiredData()
      .then((response) => {
        console.log(response.data);
      });
  }
  
  render() {
    return (
      <div>
        <Navigation />
      </div>
    )
  }
};

export default App;