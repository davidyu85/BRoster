import React from 'react';
import ReactDOM from 'react-dom';
import TimelineViewContainer, 
{ 
  mapDispatchToProps,
  onSelectTimezone
} from './TimelineViewContainer';
import { Provider } from 'react-redux';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { store } from '../store';

Enzyme.configure({ adapter: new Adapter() });

describe('Testing for TimelineViewContainer.js', () => {
  it('onClickOpenDrawer dispatch correct actions with shiftId being undefined', () => {
    const dispatch = jest.fn();
    onSelectTimezone({ target: { value: 'utc' } }, mapDispatchToProps(dispatch));
    expect(dispatch.mock.calls[0][0]).toEqual(
      { 
        setupObj: { timezone : "utc"},
        type: "SET_TIMELINE_SETTING" 
      }
    );
  });
  
  it('TabularViewContainer renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(    
      <Provider store={store}>
        <TimelineViewContainer />
      </Provider>, 
    div);
    ReactDOM.unmountComponentAtNode(div);
  });
});