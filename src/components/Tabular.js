/**
 * Tabular.js - This component generates the data view in
 * table format.
 */
import React from 'react';
import { Table, Button } from 'reactstrap';
import styled from 'styled-components';
import moment from 'moment-timezone';

const TableStyle = styled(Table)`
  font-weight: 100;
  font-size: 85%;
`;

const ButtonStyle = styled(Button)`
  float: right !important;
  background: #900 !important;
  border: none !important;
`;

// This is the coloured circle display next to role
const Circle = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background: ${(props) => props.colour};
  display: inline-block;
  margin: 0px 10px -3px 0px;
`;

const TRSelect = styled.tr`
  background: ${(props) => (props.isSelected) ? '#444' : 'none'};
  td { vertical-align: middle !important; }
`;

// Template of how the table rows are represented.
const TableList = (shift, selectedShift, timezone, key, onClickOpenDrawer) => {
  const { id, employee, role, start_time, end_time } = shift;
  const { first_name, last_name } = employee;
  const { name, background_colour } = role;

  return (            
    <TRSelect key={key} isSelected={(id === selectedShift.id)}>
      <td>
        <ButtonStyle
          size="sm"
          onClick={() => onClickOpenDrawer(id, true)}
        >
          Details
        </ButtonStyle>
      </td>
      
      <td>
        {`${first_name} ${last_name}`}
      </td>
      
      <td>
        <Circle colour={background_colour} />{name}
      </td>
      
      <td>
        Starting: {moment(start_time).tz(timezone).format('LLLL')}
        <br />
        End: {moment(end_time).tz(timezone).format('LLLL')}
      </td>
    </TRSelect>
  )
}

export const Tabular = (props) => {
  const { 
    data,
    selectedData,
    config,
    onClickOpenDrawer
  } = props;

  return (
    <TableStyle borderless dark>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Role</th>
          <th>Local Date & Time in: {config.timezone}</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((shift, key) => 
            TableList(shift, selectedData, config.timezone, key, onClickOpenDrawer))
        }
      </tbody>
    </TableStyle>
  )
}