import React from 'react';
import { Table } from 'reactstrap';
import styled from 'styled-components';
import moment from 'moment-timezone';

const TableStyle = styled(Table)`
  font-weight: 100;
`;

const Circle = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background: ${(props) => props.colour};
  display: inline-block;
  margin: 0px 12px -1px 0px;
`;

export const tableList = (shift, timezone, key) => {
  const { employee, role, start_time, end_time } = shift;
  const { first_name, last_name } = employee;
  const { name, background_colour } = role;

  return (            
    <tr key={key}>
      <td>{first_name + ' ' + last_name}</td>
      <td><Circle colour={background_colour} />{name}</td>
      
      <td>
        Starting: {moment(start_time).utc().format('LLLL')}
        <br />
        End: {moment(end_time).utc().format('LLLL')}
      </td>
      
      <td>
        Starting: {moment(start_time).tz(timezone).format('LLLL')}
        <br />
        End: {moment(end_time).tz(timezone).format('LLLL')}
      </td>
    </tr>
  )
}

export const Tabular = (props) => {
  const { data, config } = props;

  return (
    <TableStyle borderless dark>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>UTC Date & Time</th>
          <th>Date & Time in - {config.timezone}</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((shift, key) => 
            tableList(shift, config.timezone, key))
        }
      </tbody>
    </TableStyle>
  )
}
  
  