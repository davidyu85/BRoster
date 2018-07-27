import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import reducers from './reducers';

import shifts from './data/shifts.json';
import roles from './data/roles.json';
import config from './data/config.json';
import employees from './data/employees.json';

// Combine shift with employees and roles to get a meaningfull data
// for the visualisations.
const preprocessedShift = () => {
  var newShift = [];
  
  shifts.forEach((shift) => {
    newShift.push(shift);    
    var latest = newShift[newShift.length - 1];
    
    latest.employee = employees.find( // Add employee data.
      person => person.id === latest.employee_id
    );
    
    latest.role = roles.find( // Add role data.
      role => role.id === latest.role_id
    );
    
    // Remove timezone so that local time in Brisbane won't appear.
    //latest.start_time = latest.start_time.split('+')[0];
    //latest.end_time = latest.end_time.split('+')[0]; 
  });

  return newShift.sort(sortByDateTime);
}

// The current roles data does not include time for starting / ending a shift.
// Such info is extracted from the shifts data and added into each role.
// The current roles data is not sorted, which will be sorted in here.
const preprocessedRole = () => {
  roles.forEach((role) => {
    let shiftRole = shifts.find((shift) => (shift.role_id === role.id));
    role.default_start_time = shiftRole.start_time.split('T')[1];
    role.default_end_time = shiftRole.end_time.split('T')[1];
  });
  
  return roles.sort((a, b) => { return a.id - b.id})
}

// Sort the list based on date/time.
const sortByDateTime = (a, b) => {
  return new Date(b.start_time) - new Date(a.start_time);
}

// The inital state.
const initialState = {
  shifts: preprocessedShift(),
  selectedShift: { role: {}, employee: {} },
  toBeConfirmedShift: {},
  drawer: false,
  roles: preprocessedRole(),
  timelineSetting: { timezone: config.timezone },
  config,
  editMode: false
};


export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});

export const store = createStore(
  connectRouter(history)(reducers), // new root reducer with router state
  initialState,
  compose(
    applyMiddleware(
      routerMiddleware(history)
    )
  )
);
