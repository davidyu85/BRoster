import moment from 'moment';

const reducers = (state, action) => {
  switch(action.type) {
    case 'OPEN_DRAWER':
      return { ...state, drawer: action.bool }; 

    case 'SELECT_SHIFT':
      let foundShift = state.shifts.find((shift) => (
        parseInt(shift.id, 10) === parseInt(action.shiftId, 10)
      ));

      return { ...state, selectedShift: foundShift }; 
      
    case 'SET_EDIT_MODE':
      return { ...state, editMode: action.bool };
      
    case 'INIT_TOBE_CONFIRMED_SHIFT':
      return { ...state, toBeConfirmedShift: state.selectedShift };
      
    case 'CLEAR_TOBE_CONFIRMED_SHIFT':
      return { ...state, toBeConfirmedShift: {} };
  
    case 'SAVE_EDITED_SHIFT':
      let { shifts, toBeConfirmedShift } = state;
      let newListOfShifts = Object.assign([], shifts);
      let foundIndex = newListOfShifts.findIndex((shift) => (
        shift.id === toBeConfirmedShift.id
      ));
  
      newListOfShifts[foundIndex] = toBeConfirmedShift;
      newListOfShifts.sort((a, b) => {
        return new Date(b.start_time) - new Date(a.start_time);
      });
        
      return { 
        ...state,
        shifts: newListOfShifts,
        selectedShift: toBeConfirmedShift,
        toBeConfirmedShift: {},
        editMode: false
      };
  
    case 'SET_TOBE_CONFIRMED_SHIFT':
      let newConfirmedShift = Object.assign({}, state.toBeConfirmedShift);
      let { date, role_id } = action.dateRoleObj;
      
      if(role_id) { // If a role is assigned, modifies time to the toBeConfirmedShift state.
        let startDateOnly = newConfirmedShift.start_time.split('T')[0];
        let endDateOnly = startDateOnly;
        
        // If is a night shift, end day must plus one day.
        if(role_id === 3) {
          endDateOnly = moment(endDateOnly).add(1, 'days').format('YYYY-MM-DD');
        }
        
        newConfirmedShift.role_id = role_id;
        newConfirmedShift.role = state.roles.find((role) => (
          role.id === role_id
        ));
        newConfirmedShift.start_time = `${startDateOnly}T${newConfirmedShift.role.default_start_time}`;
        newConfirmedShift.end_time = `${endDateOnly}T${newConfirmedShift.role.default_end_time}`;
      }
  
      if(date) { // If the a new date is received, modifies time to the toBeConfirmedShift state.
        let startDateOnly = moment(date).format('YYYY-MM-DD');
        let endDateOnly = startDateOnly;
        let startTimeOnly = newConfirmedShift.start_time.split('T')[1];
        let endTimeOnly = newConfirmedShift.end_time.split('T')[1];
        
        // If is a night shift, end day must plus one day.
        if(newConfirmedShift.role_id === 3) {
          endDateOnly = moment(endDateOnly).add(1, 'days').format('YYYY-MM-DD');
        }
        
        newConfirmedShift.start_time = `${startDateOnly}T${startTimeOnly}`;
        newConfirmedShift.end_time = `${endDateOnly}T${endTimeOnly}`;
      }
  
      return { ...state, toBeConfirmedShift: newConfirmedShift };
    
    case 'SET_TIMELINE_SETTING':
      return { ...state, timelineSetting: action.setupObj };

    default:
        return state;
    }
};

export default reducers;
