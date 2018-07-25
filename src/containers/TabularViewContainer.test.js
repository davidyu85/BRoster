import React from 'react';
import ReactDOM from 'react-dom';
import TabularViewContainer, 
  { 
    onClickOpenDrawer,
    mapDispatchToProps
  } from './TabularViewContainer';
import { Provider } from 'react-redux';
import { store } from '../store';

describe('Testing for TabularViewContainer.js', () => {
  it('TabularViewContainer renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(    
      <Provider store={store}>
        <TabularViewContainer />
      </Provider>, 
    div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('onClickOpenDrawer dispatch correct action', () => {
    const dispatch = jest.fn();
    onClickOpenDrawer('1', true, mapDispatchToProps(dispatch));
    expect(dispatch.mock.calls[0][0]).toEqual({ bool: true, type: 'OPEN_DRAWER'});
  });
});