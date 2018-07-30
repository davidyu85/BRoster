import reducer from './reducers';

describe('Testing the reducers.js', () => {
  it('Open the drawer.', () => {
    expect(
      reducer({}, {
        type: 'OPEN_DRAWER',
        bool: true
      })
    ).toEqual({
      drawer: true
    })
  });
  
  it('Select a shift', () => {
    expect(
      reducer({
        shifts: [{ id: 1 }, { id: 2 }, { id: 3 }]
      },
      {
        type: 'SELECT_SHIFT',
        shiftId: 2
      })
    ).toEqual({
      shifts: [{ id: 1 }, { id: 2 }, { id: 3 }],
      selectedShift: { id: 2 }
    })
  });
  
  it('Set edit mode.', () => {
    expect(
      reducer({}, {
        type: 'SET_EDIT_MODE',
        bool: true
      })
    ).toEqual({
      editMode: true
    })
  });
  
  it('Initialise toBeConfirmedShift state.', () => {
    expect(
      reducer({ 
        toBeConfirmedShift: {},
        selectedShift: { id: 2 }
      },
      {
        type: 'INIT_TOBE_CONFIRMED_SHIFT'
      })
    ).toEqual({
      toBeConfirmedShift: { id: 2 },
      selectedShift: { id: 2 }
    })
  });
  
  it('Clear toBeConfirmedShift state.', () => {
    expect(
      reducer({ 
        toBeConfirmedShift: { id: 2 },
      },
      {
        type: 'CLEAR_TOBE_CONFIRMED_SHIFT'
      })
    ).toEqual({
      toBeConfirmedShift: {},
    })
  });
  
  it('Save edited shift.', () => {
    expect(
      reducer({ 
        toBeConfirmedShift: { id: 2, value: 'abc', employee_id: 2 },
        selectedShift: { id: 2, value: 'b', employee_id: 2},
        shifts: [
          { id: 1, value: 'a', employee_id: 1 },
          { id: 2, value: 'b', employee_id: 2 },
          { id: 3, value: 'c', employee_id: 3 }],
        editMode: true,
      },
      {
        type: 'SAVE_EDITED_SHIFT'
      })
    ).toEqual({
      toBeConfirmedShift: {},
      selectedShift: { id: 2, value: 'abc', employee_id: 2 },
      shifts: [
        { id: 1, value: 'a', employee_id: 1 },
        { id: 2, value: 'abc', employee_id: 2 },
        { id: 3, value: 'c', employee_id: 3 }],
      editMode: false,
    })
  });
  
  it('Set toBeConfirmedState via role id', () => {
    const roles = [
      { id: 1, name: 'R1', default_start_time: '01:00:00+00:00', default_end_time: '02:00:00+00:00'},
      { id: 2, name: 'R2', default_start_time: '02:00:00+00:00', default_end_time: '03:00:00+00:00'},
      { id: 3, name: 'R3', default_start_time: '03:00:00+00:00', default_end_time: '04:00:00+00:00'},
    ];
    
    const toBeConfirmedShift = {
      id: 1,
      role_id: 1,
      role: { id: 1, name: 'R1', default_start_time: '01:00:00+00:00', default_end_time: '02:00:00+00:00'},
      start_time: '2018-06-20T01:00:00+00:00',
      end_time: '2018-06-20T02:00:00+00:00'
    };
    
    const expected = {
      id: 1,
      role_id: 3,
      role: { id: 3, name: 'R3', default_start_time: '03:00:00+00:00', default_end_time: '04:00:00+00:00'},
      start_time: '2018-06-20T03:00:00+00:00',
      end_time: '2018-06-21T04:00:00+00:00'
    };
    
    expect(
      reducer({
        roles,
        toBeConfirmedShift
      },
      {
        type: 'SET_TOBE_CONFIRMED_SHIFT',
        dateRoleObj: { role_id: 3 }
      })
    ).toEqual({
      roles,
      toBeConfirmedShift: expected
    })
  });
  
  it('Set toBeConfirmedState via date', () => {
    const toBeConfirmedShift = {
      id: 1,
      role_id: 3,
      role: { id: 3, name: 'R3', default_start_time: '03:00:00+00:00', default_end_time: '04:00:00+00:00'},
      start_time: '2018-06-20T03:00:00+00:00',
      end_time: '2018-06-20T04:00:00+00:00'
    };
    
    const expected = {
      id: 1,
      role_id: 3,
      role: { id: 3, name: 'R3', default_start_time: '03:00:00+00:00', default_end_time: '04:00:00+00:00'},
      start_time: '2018-06-24T03:00:00+00:00',
      end_time: '2018-06-25T04:00:00+00:00'
    };
    
    expect(
      reducer({
        toBeConfirmedShift
      },
      {
        type: 'SET_TOBE_CONFIRMED_SHIFT',
        dateRoleObj: { date: '2018-06-24' }
      })
    ).toEqual({
      toBeConfirmedShift: expected
    })
  });
});