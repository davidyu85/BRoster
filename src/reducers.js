const initialState = {
  shifts: [],
  timeZone: ''
};


const reducers = (state = initialState, action) => {
  switch(action.type) {
    case 'LOAD_ALL_SHIFTS':
      return { 
        ...state, 
        shifts: action.shiftsArray.sort((a,b) => {
          return new Date(b.start_time) - new Date(a.start_time);
        }) 
      };
    case 'SET_TIME_ZONE':
      return { ...state, timeZone: action.timeZoneStr };
    default:
      return state;
  }
};

export default reducers;
