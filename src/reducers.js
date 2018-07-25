import shifts from './data/shifts.json';
import roles from './data/roles.json';
import config from './data/config.json';
import employees from './data/employees.json';

// Combine shift with employees and roles to get a meaningfull data
// for the visualisations.
const preprocessedShift = () => {
  var newShift = [];
  
  shifts.map((shift) => {
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
  config: config
};


const reducers = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

export default reducers;
