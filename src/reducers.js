const reducers = (state, action) => {
  switch(action.type) {
    case 'OPEN_DRAWER':
      return { ...state, drawer: action.bool }; 

    case 'SELECT_SHIFT':
      let foundShift = state.shifts.find((shift) => (
        shift.id === action.shiftId
      ));

      return { ...state, selectedShift: foundShift}; 
      
    default:
      return state;
  }
};

export default reducers;
