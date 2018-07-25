import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment-timezone';
import { Tabular } from './Tabular';
import config from '../data/config.json'

Enzyme.configure({ adapter: new Adapter() });

describe('Testing Tabular.js', () => {
  it('Be able to display more than one row including the one in <thead>', () => {
    const data = [{
      id: 61578,
      start_time: '2018-06-19T13:00:00+00:00',
      end_time: '2018-06-19T21:30:00+00:00',
      employee: { id: 1, first_name: 'R1', last_name: 'D1'},
      role: { id: 1, name: 'Morning', background_colour: '#fa0' }
    }];
    
    const wrapper = shallow(
    <Tabular
      data={data}
      config={config}
    />
    );
    expect(wrapper.find('tr').length).toBe(2);
  });
  
  it('Tabular renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(    
      <Tabular
        data={[]}
        config={config}
      />,
    div);
    ReactDOM.unmountComponentAtNode(div);
  });
})