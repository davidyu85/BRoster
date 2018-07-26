import * as actions from './actions';

describe('Testing for actions.js', () => {
  it('Enable to open the drawer', () => {
    const bool = true;
    const expectedAction = {
      type: 'OPEN_DRAWER',
      bool
    }
    expect(actions.openDrawer(bool)).toEqual(expectedAction)
  });
  
  it('Should be able to select a shift', () => {
    const shiftId = 123;
    const expectedAction = {
      type: 'SELECT_SHIFT',
      shiftId
    }
    expect(actions.selectShift(shiftId)).toEqual(expectedAction)
  });
  
  it('Enable edit mode', () => {
    const bool = true;
    const expectedAction = {
      type: 'SET_EDIT_MODE',
      bool
    }
    expect(actions.setEditMode(bool)).toEqual(expectedAction)
  });
  
  it('Initialise toBeConfirmedShift state', () => {
    const expectedAction = {
      type: 'INIT_TOBE_CONFIRMED_SHIFT'
    }
    expect(actions.initToBeConfirmedShift()).toEqual(expectedAction)
  });
  
  it('Empty the toBeConfirmedShift state', () => {
    const expectedAction = {
      type: 'CLEAR_TOBE_CONFIRMED_SHIFT',
    }
    expect(actions.clearToBeConfirmedShift()).toEqual(expectedAction)
  });
  
  it('Trigger to modify toBeConfirmedShift state', () => {
    const dateRoleObj = { role_id: 1 };
    const expectedAction = {
      type: 'SET_TOBE_CONFIRMED_SHIFT',
      dateRoleObj
    }
    expect(actions.setToBeConfirmedShift(dateRoleObj)).toEqual(expectedAction)
  });
  
  it('Enable to trigger saving the edited shift', () => {
    const expectedAction = {
      type: 'SAVE_EDITED_SHIFT',
    }
    expect(actions.saveEditedShift()).toEqual(expectedAction)
  });
})