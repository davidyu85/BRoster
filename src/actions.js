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