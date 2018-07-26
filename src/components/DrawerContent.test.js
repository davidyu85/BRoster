import React from 'react';
import ReactDOM from 'react-dom';
import { DrawerContent } from './DrawerContent';
import { Provider } from 'react-redux';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { store } from '../store';

Enzyme.configure({ adapter: new Adapter() });

describe('Testing for DrawerContent.js', () => {
  const data = {
    id: 61578,
    start_time: '2018-06-19T13:00:00+00:00',
    end_time: '2018-06-19T21:30:00+00:00',
    employee: { id: 1, first_name: 'R1', last_name: 'D1'},
    role: { id: 1, name: 'Morning', background_colour: '#fa0' }
  };
  
  var state = store.getState();
  state.selectedShift = data;
  state.initToBeConfirmedShift = jest.fn();
  state.setToBeConfirmedShift = jest.fn();
  state.saveEditedShift = jest.fn();
  state.setEditMode = jest.fn();
  const wrapper = mount(
    <Provider store={store}>
      <DrawerContent allProps={store.getState()} />
    </Provider>
  );

  it('Edit button works - should return true since it enters the editMode', () => {
    wrapper.find('button').simulate('click');
    expect(store.getState().setEditMode.mock.calls[0][0]).toBeTruthy;
  });
})