/**
 * DrawerEditShift.js - An UI component displayed in the side-drawer for
 * modifying the shifts.
 */
import React, { Component } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import moment from 'moment-timezone';
import { FaCloudUpload, FaMinusCircle } from 'react-icons/lib/fa';
import { Button, Input } from 'reactstrap';
import scrollToElement from 'scroll-to-element';

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

const SmallText = styled.small`
  font-size: 12px !important;
`;

export const onSelectRole = (event, callBack) => {
  return callBack({ role_id: parseInt(event.target.value, 10) });
}

export const onSelectDate = (event, callBack) => {
  return callBack({ date: event });
}

export const onSave = (callBack) => {
  setTimeout(() => 
    scrollToElement('#scrollToMe', { align: 'middle' })
  , 100); // Need a small timeout otherwise this won't scroll properly.
  return callBack();
}

export default class DrawerEditShift extends Component {
  componentWillMount() {
    this.props.allProps.initToBeConfirmedShift();
  }

  render(){
    const { 
      selectedShift,
      roles,
      config,
      setEditMode,
      saveEditedShift,
      setToBeConfirmedShift,
      toBeConfirmedShift
    } = this.props.allProps;
    
    const {
      start_time,
      end_time
    } = toBeConfirmedShift;

    return (
      <div>
        <h4>Edit shift</h4>
        <p><b>Select a role:</b></p>
        <Input 
          type="select"
          onChange={(e) => onSelectRole(e, setToBeConfirmedShift)}
          defaultValue={selectedShift.role_id}
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
        <p><b>Select a date (Based on UTC):</b></p>
        <Calendar
          value={new Date(Date.parse(selectedShift.start_time.split('T')[0]))}
          onChange={(e) => onSelectDate(e, setToBeConfirmedShift)}
        />
        
        <SmallText>
          <br />
          <div><b>New Workhours - In {config.timezone}</b></div>
          <div><b>From: </b> {moment(start_time).tz(config.timezone).format('LLLL')}</div>
          <div><b>To: </b> {moment(end_time).tz(config.timezone).format('LLLL')}</div>
          <br />
          <div><b>New Workhours - UTC</b></div>
          <div><b>From: </b> {moment(start_time).utc().format('LLLL')}</div>
          <div><b>To: </b> {moment(end_time).utc().format('LLLL')}</div>
        </SmallText>
        
        <hr />
        <Save onClick={() => onSave(saveEditedShift)}>
          <FaCloudUpload /> Save
        </Save>
        <Cancel onClick={() => setEditMode(false)}>
          <FaMinusCircle /> Cancel
        </Cancel>
      </div>
    )
  }
}