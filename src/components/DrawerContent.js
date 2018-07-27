/**
 * DrawerContent.js - An display component for viewing the details
 * of a shift selected from the tabular view. The view is displayed
 * in the side-drawer container.
 */
import React from 'react';
import DonutChart from "react-svg-donut-chart";
import { Button } from 'reactstrap';
import { FaEdit } from 'react-icons/lib/fa';
import moment from 'moment-timezone';
import styled from 'styled-components';

const DonutWrapper = styled.div`
  width: 150px;
  height: auto;
  margin 12px auto;
  left: 0;
  right: 0;
`;

const ShiftBadge = styled.b`
  display: inline-block;
  border-radius: 6px;
  padding: 0 12px 0 12px;
  margin-left: 6px;
  font-weight: 500;
  background: ${(props) => props.colour};
`;

const ButtonStyle = styled(Button)`
  background: #339 !important;
  border: none !important;
  
  svg {
    margin-top: -4px;
  }
`;

export const generateChartData = (roles, shifts, selectedShift) => {
  let shiftsForAUser = shifts.filter((shift) => (
    shift.employee_id === selectedShift.employee_id
  ));
  
  let chartData = roles.map((role) => {
    let value = shiftsForAUser.filter((shift) => (
      shift.role_id === role.id
    )).length;
                                      
    return { value, stroke: role.background_colour, role: role.name }
  });

  return chartData;
}

export const DrawerContent = (props) => {
  const {
    shifts,
    selectedShift,
    roles,
    config,
    setEditMode
  } = props.allProps;

  const {
    id,
    employee,
    role,
    start_time,
    end_time
  } = selectedShift;
  
  let chartData = generateChartData(roles, shifts, selectedShift);
  let mostRole = chartData.sort((a, b) => { return b.value - a.value })[0].role;

  return (
    <div>
      <DonutWrapper>
        <DonutChart
          spacing={2}
          data={chartData} 
        />
      </DonutWrapper>
      <center>
        <h3>{`${employee.first_name} ${employee.last_name}`}</h3>
        <small>Prefer {mostRole} Shifts</small>
      </center>
      <hr />
      <h5>Selected Shift:</h5>
      <p><b>Shift ID: </b> #{id}</p>
      <p><b>Role Type: </b> <ShiftBadge colour={role.background_colour}>{role.name} shift</ShiftBadge></p>
      <hr />
      <p><b>Workhours - In {config.timezone}</b></p>
      <p><b>From: </b> {moment(start_time).tz(config.timezone).format('LLLL')}</p>
      <p><b>To: </b> {moment(end_time).tz(config.timezone).format('LLLL')}</p>
      <br />
      <p><b>Workhours - UTC</b></p>
      <p><b>From: </b> {moment(start_time).utc().format('LLLL')}</p>
      <p><b>To: </b> {moment(end_time).utc().format('LLLL')}</p>
      <hr />
      <ButtonStyle onClick={() => setEditMode(true)}>
        <FaEdit /> Edit Shift
      </ButtonStyle>
    </div>
  )
}