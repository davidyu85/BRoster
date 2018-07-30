import React from 'react';
import ReactDOM from 'react-dom';
import TabularViewContainer, 
{ 
  onClickOpenDrawer,
  runWhenDrawerIsTrue,
  mapDispatchToProps
} from './TabularViewContainer';
import { Provider } from 'react-redux';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { store } from '../store';

Enzyme.configure({ adapter: new Adapter() });

describe('Testing for TabularViewContainer.js', () => {
  const wrapper = mount(
    <Provider store={store}>
      <TabularViewContainer />
    </Provider>
  );
  
  jest.useFakeTimers();
  
  it('TabularViewContainer renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(    
      <Provider store={store}>
        <TabularViewContainer />
      </Provider>, 
    div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('onClickOpenDrawer dispatch correct actions with shiftId being undefined', () => {
    const dispatch = jest.fn();
    onClickOpenDrawer(undefined, true, mapDispatchToProps(dispatch));
    expect(dispatch.mock.calls[0][0]).toEqual({ bool: true, type: 'OPEN_DRAWER'});
  });
  
  it('onClickOpenDrawer dispatch correct actions with a shiftId', () => {
    const dispatch = jest.fn();
    onClickOpenDrawer(1, true, mapDispatchToProps(dispatch));
    expect(dispatch.mock.calls[0][0]).toEqual({ bool: false, type: 'SET_EDIT_MODE'});
    expect(dispatch.mock.calls[1][0]).toEqual({ shiftId: 1, type: 'SELECT_SHIFT'});
    expect(dispatch.mock.calls[2][0]).toEqual({ bool: true, type: 'OPEN_DRAWER'});
  });
  
  it('runWhenDrawerIsTrue functions as intended', () => {
    const dispatch = jest.fn();
    let props = mapDispatchToProps(dispatch);
    props.drawer = true;

    runWhenDrawerIsTrue(props);
    expect(dispatch.mock.calls[0][0]).toEqual({ bool: false, type: 'OPEN_DRAWER'});
    jest.runAllTimers();
    expect(dispatch.mock.calls[1][0]).toEqual({ bool: true, type: 'OPEN_DRAWER'});
    
  });
  
  it('Click the close button to change state for closing the drawer', () => {
    store.getState().drawer = true;
    wrapper.find('.react-drawer-drawer svg').at(0).simulate('click');
    expect(store.getState().drawer).toBeFalsy;
  });
  
  it('Click on one of the details button to get the shift data', () => {
    wrapper.find('button').at(0).simulate('click');
    expect(store.getState().selectedShift.id).not.toBe(undefined);
  });
});