/**
 * DrawerEditShift.js - An UI component displayed in the side-drawer for
 * modifying the shifts.
 */
import React, { Component } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import { FaCloudUpload, FaMinusCircle } from 'react-icons/lib/fa';
import { Button, Input } from 'reactstrap';

const ButtonStyle = styled(Button)`
  border: none !important;
  margin-right: 12px;
  svg {
    margin-top: -4px;
  }
`;

const Save = styled(ButtonStyle)`
  background: #339 !important;
`;

const Cancel = styled(ButtonStyle)`
  background: #700 !important;
`;

const onSelectRole = (event, callBack) => {
  return callBack({ role_id: parseInt(event.target.value, 10) });
}

const onSelectDate = (event, callBack) => {
  return callBack({ date: event });
}

export default class DrawerEditShift extends Component {
  componentWillMount() {
    this.props.allProps.initToBeConfirmedShift();
  }

  render(){
    const { 
      selectedShift,
      roles,
      setEditMode,
      saveEditedShift,
      setToBeConfirmedShift
    } = this.props.allProps;

    const { 
      role_id,
      start_time
    } = selectedShift;

    return (
      <div>
        <br /><br /><br />
        <h4>Edit shift</h4>
        <p><b>Select a role:</b></p>
        <Input 
          type="select"
          onChange={(e) => onSelectRole(e, setToBeConfirmedShift)}
          defaultValue={role_id}
        >
          {
            roles.map((role) => 
              <option
                key={role.id}
                value={role.id}
              >
                {role.name} shift
              </option>
            )
          }
        </Input>
        <br />
        <p><b>Select a date:</b></p>
        <Calendar
          value={new Date(Date.parse(start_time))}
          onChange={(e) => onSelectDate(e, setToBeConfirmedShift)}
        />
        <hr />
        <Save
          onClick={() => saveEditedShift()}
        >
          <FaCloudUpload /> Save
        </Save>
        <Cancel 
          onClick={() => setEditMode(false)}
        >
          <FaMinusCircle /> Cancel
        </Cancel>
      </div>
    )
  }
}