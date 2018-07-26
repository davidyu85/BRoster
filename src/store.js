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
    
    latest.employee = employees.find(
      person => person.id === latest.employee_id
    );
    
    latest.role = roles.find(
      role => role.id === latest.role_id
    );
  });
  
  return newShift.sort(sortByDateTime);
}

// Sort the list based on date/time.
const sortByDateTime = (a, b) => {
  return new Date(b.start_time) - new Date(a.start_time);
}

// The inital state.
const initialState = {
  shifts: preprocessedShift(),
  selectedShift: { role: {}, employee: {} },
  drawer: false,
  roles,
  config
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
