import React from 'react';
import ReactDOM from 'react-dom';
import DrawerContentContainer from './DrawerContentContainer';
import { Provider } from 'react-redux';
import { store } from '../store';

describe('Testing for DrawerContentContainer.js', () => {
  it('DrawerContentContainer renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(    
      <Provider store={store}>
        <DrawerContentContainer />
      </Provider>, 
    div);
    ReactDOM.unmountComponentAtNode(div);
  });
});