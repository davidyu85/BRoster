import { findOverlapShifts } from './findOverlapShifts';

describe('Testing for findOverlapShifts.', () => {
  it('findOverlapShifts works as intended.', () => {
    const shifts = [
      { id: 1, role_id: 1, employee_id: 1 },
      { id: 2, role_id: 2, employee_id: 2 },
      { id: 3, role_id: 3, employee_id: 3 },
      { id: 4, role_id: 1, employee_id: 3 },
      { id: 5, role_id: 2, employee_id: 3 },
      { id: 6, role_id: 3, employee_id: 4 },
      { id: 7, role_id: 3, employee_id: 5 },
    ];
    
    const expected = [
      { id: 1, role_id: 1, employee_id: 1, overwork: false },
      { id: 2, role_id: 2, employee_id: 2, overwork: false },
      { id: 3, role_id: 3, employee_id: 3, overwork: true },
      { id: 4, role_id: 1, employee_id: 3, overwork: true },
      { id: 5, role_id: 2, employee_id: 3, overwork: true },
      { id: 6, role_id: 3, employee_id: 4, overwork: false },
      { id: 7, role_id: 3, employee_id: 5, overwork: false  }
    ];
    
    expect(findOverlapShifts(shifts)).toBe(expected);
  });
});