export const updateShifts = shiftsArray => ({
  type: 'UPDATE_SHIFTS',
  shiftsArray
});

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
})