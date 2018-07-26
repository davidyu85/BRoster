/**
 * DrawerContentContainer.js - The container of content page displayed.
 * in the side-drawer.
 */
import React, { Component } from 'react';
import DonutChart from "react-svg-donut-chart"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import styled from 'styled-components';
// import {  } from '../actions';

const Wrapper = styled.div`
  p {
    font-size: 14px;
    margin-bottom: 4px;
  }
`;

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

// Passing down all states from Redux store to props.
const mapStateToProps = state => state;

// Enable Redux store dispatch for dispatching an action.
export const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators(
  {

  }, 
  dispatch
)

export const generateChartData = (roles, shifts, selectedShift) => {
  let shiftsForAUser = shifts.filter((shift) => (
    shift.employee_id === selectedShift.employee_id
  ));
  
  let chartData = roles.map((role) => {
    let value = shiftsForAUser.filter((shift) => (
      shift.role_id === role.id
    )).length;
                                      
    return { value, stroke: role.background_colour }
  });

  return chartData;
}

class DrawerContentContainer extends Component {
  render() {
    const {
      shifts,
      selectedShift,
      roles,
      config,
    } = this.props;
    
    const {
      id,
      employee,
      role,
      start_time,
      end_time
    } = selectedShift;

    return (
      <Wrapper>
        <DonutWrapper>
          <DonutChart
            spacing={2}
            data={generateChartData(roles, shifts, selectedShift)} 
          />
        </DonutWrapper>
        <center><h3>{`${employee.first_name} ${employee.last_name}`}</h3></center>
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
      </Wrapper>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContentContainer);