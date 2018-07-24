export const setTimeZone = timeZoneStr => ({
  type: 'SET_TIME_ZONE',
  timeZoneStr
});

export const loadAllShifts = shiftsArray => ({
  type: 'LOAD_ALL_SHIFTS',
  shiftsArray
});