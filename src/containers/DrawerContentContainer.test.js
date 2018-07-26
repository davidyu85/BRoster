import React from 'react';
import ReactDOM from 'react-dom';
import DrawerContentContainer from './DrawerContentContainer';
import { Provider } from 'react-redux';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DrawerContent } from '../components/DrawerContent';
import DrawerEditShift from '../components/DrawerEditShift';
import { store } from '../store';

Enzyme.configure({ adapter: new Adapter() });

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
  
  it('Change editMode state to switch components', () => {
    const wrapper = mount(
      <Provider store={store}>
        <DrawerContentContainer />
      </Provider>
    );
    expect(wrapper.find(DrawerContent).length).toBe(1);
    
    store.getState().editMode = true;
    store.getState().selectedShift.start_time = '2018-06-19T13:00:00+00:00';
    const wrapper2 = mount(
      <Provider store={store}>
        <DrawerContentContainer />
      </Provider>
    );
    expect(wrapper2.find(DrawerEditShift).length).toBe(1);
  })
});