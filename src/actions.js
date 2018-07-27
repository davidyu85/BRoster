/**
 * actions.js - A redux way to store a series of actions to be 
 * dispatched for calling the reducers to change the state in store.
 * Any actions that triggers application state changes are all recorded
 * in here. Functions that does not modify application state should be 
 * placed in containers / components.
 */
export const openDrawer = bool => ({
  type: 'OPEN_DRAWER',
  bool
});

export const selectShift = shiftId => ({
  type: 'SELECT_SHIFT',
  shiftId
});

export const setEditMode = bool => ({
  type: 'SET_EDIT_MODE',
  bool
});

export const initToBeConfirmedShift = () => ({
  type: 'INIT_TOBE_CONFIRMED_SHIFT'
});

export const clearToBeConfirmedShift = () => ({
  type: 'CLEAR_TOBE_CONFIRMED_SHIFT'
});

export const setToBeConfirmedShift = (dateRoleObj) => ({
  type: 'SET_TOBE_CONFIRMED_SHIFT',
  dateRoleObj
});

export const saveEditedShift = () => ({
  type: 'SAVE_EDITED_SHIFT'
});

export const setTimelineSetting = (setupObj) => ({
  type: 'SET_TIMELINE_SETTING',
  setupObj
})