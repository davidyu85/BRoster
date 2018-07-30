/**
 * Timeline.js - Add a timeline visualisation using react-calendar-timeline
 * https://github.com/namespace-ee/react-calendar-timeline
 */

import React from 'react';
import Timeline from 'react-calendar-timeline';
import moment from 'moment-timezone';
import { FaExclamationCircle } from 'react-icons/lib/fa';
import 'react-calendar-timeline/lib/Timeline.css';
 
// Make groups for timeline visualisation. 
// In this instance, the employees are made into groups.
export const makeGroups = (data) => { 
  let employeeNames = [...new Set(
    data.map(obj => 
      (`${obj.employee.first_name} ${obj.employee.last_name}`)
    )
  )]; // Make unique array of employee names via ES6.
  
  let employeeIds = [...new Set(
    data.map(obj => obj.employee.id)
  )]; // Make unique array of employee ids via ES6.
  
  let groupsForVis = employeeNames.map((name, i) => (
    {
      id: employeeIds[i],
      title: name  
    }
  ));

  return groupsForVis;
}

// Make items for timeline visualisation.
// The items in this context are the time-blocks displayed on timeline. 
export const makeItems = (data, timezone, onSelectTimeBlock) => {
  // React-Calendar-Timeline will just change anything to local date.
  // In order to get this to work to display UTC and Perth time correctly,
  // string manipulation is necessary even if moment.js is used.
  let itemsForVis = data.map((shift) => {
    let start_time, end_time;

    if(timezone === 'utc') {
      start_time = moment(shift.start_time.split('+')[0]);
      end_time = moment(shift.end_time.split('+')[0]);
    } else {
      start_time = moment(
        moment(shift.start_time)
          .tz(timezone)
          .format()
          .split('+')[0]
      );
      
      end_time = moment( 
        moment(shift.end_time)
          .tz(timezone)
          .format()
          .split('+')[0]
      );
    }
    
    return ({
      id: shift.id,
      title: shift.overwork ? <FaExclamationCircle /> : '',
      group: shift.employee.id,
      start_time,
      end_time,  
      style: { backgroundColor: shift.role.background_colour },
      itemProps: {
        id: shift.id,
        onClick: (e) => onSelectTimeBlock(e.target.id)
      }
    })
  });

  return itemsForVis;
}

export const TimelineView = (props) => {
  const { data, timezone, onSelectTimeBlock } = props;
  // In the zoom properties, 1000 is for 1 second in milliseconds, 86400 is for a day.
  return (
    <Timeline
      groups={makeGroups(data)}
      items={makeItems(data, timezone, onSelectTimeBlock)}
      defaultTimeStart={moment(props.defaultTimeStart).add('-1','day').utc()}
      defaultTimeEnd={moment(props.defaultTimeEnd).add('1','day').utc()}
      canResize={false}
      canMove={false}
      traditionalZoom={true}
      minZoom={(86400 * 1000)}
      maxZoom={(8 * 86400 * 1000)}
    />
  )
};
