import React from 'react';
import { Table } from 'reactstrap';
import styled from 'styled-components';
import moment from 'moment-timezone';

const Circle = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background: ${(props) => props.colour};
  display: inline-block;
  margin: 0px 12px -1px 0px;
`;

export const tableList = (shift) => {
  const { employee, role, start_time, end_time } = shift;
  const { first_name, last_name } = employee;
  const { name, background_colour } = role;

  return (            
    <tr>
      <td>{first_name + ' ' + last_name}</td>
      <td><Circle colour={background_colour} />{name}</td>
      <td>
        {moment(start_time).tz("America/Los_Angeles").format('LLLL')}
        {moment(end_time).tz("America/Los_Angeles").format('LLLL')}
      </td>
    </tr>
  )
}

export const Tabular = (props) => {
  const { data } = props;

  return (
    <Table borderless dark>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Period</th>
        </tr>
      </thead>
      <tbody>
        {data.map((shift) => tableList(shift))}
      </tbody>
    </Table>
  )
}
  
  