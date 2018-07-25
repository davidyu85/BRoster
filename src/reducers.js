const reducers = (state, action) => {
  switch(action.type) {
    case 'OPEN_DRAWER':
      return { ...state, drawer: action.bool }; 

    default:
      return state;
  }
};

export default reducers;
