/**
 * This determines the mocked api that may come
 * from the backend.
 **/

/* global require */
var config = require('./data/config.json');
var employees = require('./data/employees.json');
var roles = require('./data/roles.json');
var shifts = require('./data/shifts.json');

// Deep copy shifts data and combine with employees and roles data
function getRequiredData() {
  var newShifts = JSON.parse(
    JSON.stringify(shifts)
  ); // Deep clone array so "shifts" don't get effected.
  
  newShifts.forEach(function(shift) { 
    // Attach employee data to shift
    employees.forEach(function(employee) {   
      if(shift.employee_id === employee.id) 
        shift.employee = employee;
    });
    
    // Attach role data to shift
    roles.forEach(function(role) {   
      if(shift.role_id === role.id)
        shift.role = role; 
    });  
  });

  return newShifts;
}

module.exports = function() {
  var data = {
    config: config,
    employees: employees,
    roles: roles,
    shifts: shifts,
    requiredData: getRequiredData() // Combined shifts + employee + roles data for the interface.
  }

  return data;
}