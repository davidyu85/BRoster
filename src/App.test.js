import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';

describe('Testing for App.js', () => {
  it('App renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(    
      <Provider store={store}>
        <App />
      </Provider>, 
    div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

