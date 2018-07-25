/**
 * Timeline.js - Add a timeline visualisation using react-calendar-timeline
 * https://github.com/namespace-ee/react-calendar-timeline
 */

import React from 'react';
import Timeline from 'react-calendar-timeline';
import moment from 'moment';
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
export const makeItems = (data) => {
  let itemsForVis = data.map((shift) => (
    {
      id: shift.id,
      group: shift.employee.id,
      title: `${shift.role.name} shift`,
      start_time: moment(shift.start_time).utc(),
      end_time: moment(shift.end_time).utc(),
      style: { backgroundColor: shift.role.background_colour }
    }
  ));

  return itemsForVis;
}

export const TimelineView = (props) => (
  <Timeline
    groups={makeGroups(props.data)}
    items={makeItems(props.data)}
    defaultTimeStart={moment(props.defaultTimeStart).add('-1','day').utc()}
    defaultTimeEnd={moment(props.defaultTimeEnd).add('1','day').utc()}
    canResize={false}
    canMove={false}
    traditionalZoom={true}
    minZoom={(86400 * 1000)}
    maxZoom={(8 * 86400 * 1000)}
  />
);
