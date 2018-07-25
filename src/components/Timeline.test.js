import React from 'react';
import ReactDOM from 'react-dom';
import { TimelineView, makeGroups, makeItems } from './Timeline';
import moment from 'moment';

describe('Timeline Component', () => {
  it('makeGroups functions correctly. ', () => {
    const data = [
      { employee: { id: 1, first_name: 'R1', last_name: 'D1'} },
      { employee: { id: 2, first_name: 'R2', last_name: 'D2'} },
      { employee: { id: 3, first_name: 'R3', last_name: 'D3'} }
    ];
    
    const expected = [
      { id: 1, title: 'R1 D1' },
      { id: 2, title: 'R2 D2' },
      { id: 3, title: 'R3 D3' },
    ]
    
    expect(makeGroups(data)).toEqual(expected);
  });
  
  it('makeItems functions correctly.', () => {
    const data = [
      { 
        id: 61578,
        start_time: '2018-06-19T13:00:00+00:00',
        end_time: '2018-06-19T21:30:00+00:00',
        employee: { id: 1, first_name: 'R1', last_name: 'D1'},
        role: { id: 1, name: 'Morning', background_colour: '#fa0' }
      },
      { 
        id: 61579,
        start_time: '2018-06-19T13:00:00+00:00',
        end_time: '2018-06-19T21:30:00+00:00',
        employee: { id: 2, first_name: 'R2', last_name: 'D2'},
        role: { id: 1, name: 'Morning', background_colour: '#fa0' }
      },
    ];
    
    const expected = [
      { 
        id: 61578,
        group: 1,
        title: 'Morning shift',
        start_time: moment('2018-06-19T13:00:00+00:00').utc(),
        end_time: moment('2018-06-19T21:30:00+00:00').utc(),
        style: { backgroundColor: '#fa0' }
      },
      { 
        id: 61579,
        group: 2,
        title: 'Morning shift',
        start_time: moment('2018-06-19T13:00:00+00:00').utc(),
        end_time: moment('2018-06-19T21:30:00+00:00').utc(),
        style: { backgroundColor: '#fa0' }
      },
    ]
    
    expect(makeItems(data)).toEqual(expected);
  });
  
  it('TimelineView renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(    
      <TimelineView data={[]} />,
    div);
    ReactDOM.unmountComponentAtNode(div);
  });
})