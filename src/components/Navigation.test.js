import React from 'react';
import ReactDOM from 'react-dom';
import { Navigation, changeRoute } from './Navigation';
import { history } from '../store';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Testing for Navigation.js', () => {
  it('Navigation renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Navigation />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('changeRoute sucessfully pushes a history ', () => {
    const href = '/test';
    changeRoute(href);
    expect(history.location.pathname).toBe(href);
  });
  
  it('Navigation links works', () => {
    const wrapper = mount(<Navigation />);
    
    let links = wrapper.find('.nav-link');
    links.at(0).simulate('click');
    expect(history.location.pathname).toBe('/');
    
    links.at(1).simulate('click');
    expect(history.location.pathname).toBe('/timeline');
  })
});

