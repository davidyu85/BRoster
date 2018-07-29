import React from 'react';
import ReactDOM from 'react-dom';
import { TimelineView, makeGroups, makeItems } from './Timeline';
import moment from 'moment-timezone';

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
    const onSelectTimeBlock = jest.fn();
    
    const data = [
      { 
        id: 61578,
        start_time: '2018-06-19T13:00:00+00:00',
        end_time: '2018-06-19T21:30:00+00:00',
        employee: { id: 1, first_name: 'R1', last_name: 'D1'},
        role: { id: 1, name: 'Morning', background_colour: '#fa0' }
      }
    ];
    
    const expected = [
      { 
        id: 61578,
        group: 1,
        start_time: moment('2018-06-19T13:00:00'),
        end_time: moment('2018-06-19T21:30:00'),
        style: { backgroundColor: '#fa0' },
        itemProps: {
          id: 61578,
          onClick: (e) => jest.fn()
        }
      }
    ];
    
    let madeItem = makeItems(data, 'utc')[0];
    expect(madeItem.id).toEqual(61578);
    expect(madeItem.group).toEqual(1);
    expect(madeItem.start_time).toEqual(moment('2018-06-19T13:00:00'));
    expect(madeItem.end_time).toEqual(moment('2018-06-19T21:30:00'));
    expect(madeItem.style).toEqual({ backgroundColor: '#fa0' });
    expect(madeItem.itemProps.id).toEqual(61578);
  });
  
  it('TimelineView renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(    
      <TimelineView data={[]} />,
    div);
    ReactDOM.unmountComponentAtNode(div);
  });
})