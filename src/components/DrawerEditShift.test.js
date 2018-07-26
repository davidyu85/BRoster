import React from 'react';
import ReactDOM from 'react-dom';
import DrawerEditShift, { onSelectRole, onSelectDate } from './DrawerEditShift';
import { Provider } from 'react-redux';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { store } from '../store';

Enzyme.configure({ adapter: new Adapter() });

describe('Testing for DrawerEditShift.js', () => {
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
      <DrawerEditShift allProps={store.getState()} />
    </Provider>
  );
  
  it('onSelectRole returns expected data', () => {
    const roleId = { target: { value: 1 }};
    const mockCallBack = jest.fn();
    onSelectRole(roleId, mockCallBack);
    expect(mockCallBack.mock.calls[0][0]).toEqual({ role_id: 1 });
  });
  
  it('onSelectDate returns expected data', () => {
    const date = 'YYYY-MM-DD';
    const mockCallBack = jest.fn();
    onSelectDate(date, mockCallBack);
    expect(mockCallBack.mock.calls[0][0]).toEqual({ date: 'YYYY-MM-DD' });
  });
  
  it('Dropdown value being changed correctly', () => {
    wrapper.find('select').simulate('change', { target: { value: 2 } });
    expect(store.getState().setToBeConfirmedShift.mock.calls[0][0]).toEqual({ role_id: 2 });
  });
  
  it('Save button works - should return blank since there is no value being passed', () => {
    wrapper
      .find('button')
      .not('.react-calendar__tile')
      .not('.react-calendar__navigation__arrow')
      .not('.react-calendar__navigation__label')
      .at(0)
      .simulate('click');
    expect(store.getState().saveEditedShift.mock.calls[0]).toEqual([]);
  });
  
  it('Cancel button works - should return false since it cancels the editMode', () => {
    wrapper
      .find('button')
      .not('.react-calendar__tile')
      .not('.react-calendar__navigation__arrow')
      .not('.react-calendar__navigation__label')
      .at(1)
      .simulate('click');
    expect(store.getState().setEditMode.mock.calls[0][0]).toBeFalsy;
  });
})