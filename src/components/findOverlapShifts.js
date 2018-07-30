/**
 * findOverlapShifts.js - A component containing a function searching for 
 * overwork shifts. Shifts that are considered overworked will have some
 * time overlaps.
 */

export const findOverlapShifts = (shifts) => {
  let newArr = [];
  
  // Create groups based on roles, only taking out id and employee id.
  shifts.forEach((shift, i) => {
    let pItem = { id: shift.id, employee_id: shift.employee_id };
    
    if(i===0) {
      newArr.push([pItem]);
      return;
    }
    
    if(shift.role_id === shifts[i-1].role_id) {
      newArr[newArr.length - 1].push(pItem);
    } else {
      newArr.push([pItem]);
    }
  });
  
  // Concat groups before/after, and identify which employee id has more than one
  // contained in the concat array.
  var overworkedList = [];
  newArr.forEach((arr, i) => {
    let checkArr = [].concat(arr);
    
    if(newArr[i-1]) checkArr = checkArr.concat(newArr[i-1]);
    if(newArr[i+1]) checkArr = checkArr.concat(newArr[i+1]);
    
    // Identify the overwork by find duplicated employee_id in the checkArr.
    checkArr.forEach((checkOuter) => {
      checkArr.forEach((checkInner) => {
        if(
          (checkOuter.employee_id === checkInner.employee_id) && 
          (checkOuter.id !== checkInner.id)
        ) overworkedList.push(checkOuter.id);
      });
    });
  });
  
  // Find and mark the shift that considers overworked.
  const uniqOverworkedList = [...new Set(overworkedList)];  
  shifts.forEach((shift) => {
    shift.overwork = false;
    uniqOverworkedList.forEach((id) => {
      if(shift.id === id) shift.overwork = true;
    });
  });

  return shifts;
}