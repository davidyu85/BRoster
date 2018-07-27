/**
 * TimelineViewContainer.js - A container for the timeline view.
 * The styling of the timeline is done in style.css instead of
 * Styled-Components.
 */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TimelineView } from '../components/Timeline';
import { 
  Input,
  Label,
  FormGroup,
  Col
} from 'reactstrap';
import styled from 'styled-components';
import { setTimelineSetting } from '../actions';

const FormGroupStyle = styled(FormGroup)`
  padding: 24px 36px 4px 18px;

  label {
    color: #fff;
    margin-top
  }
`;

const InputStyle = styled(Input)`
  width: 300px !important;
`;
  
const Notes = styled.div`
  color: #fff;
  font-size: 14px;
  padding-left: 18px;
  font-weight: 100;
`;

// Passing down all states from Redux store to props.
const mapStateToProps = state => state;

// Enable Redux store dispatch for dispatching an action.
export const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators(
  {
    setTimelineSetting
  }, 
  dispatch
)

export const onSelectTimezone = (event, props) => {
  return props.setTimelineSetting({ timezone: event.target.value });
}

class TimelineViewContainer extends Component {
  render() {
    const { 
      shifts,
      config,
      timelineSetting
    } = this.props;
    
    const { timezone } = config;
    
    return (
      <div>
        <TimelineView 
          data={shifts}
          defaultTimeStart={shifts[shifts.length - 1].end_time}
          defaultTimeEnd={shifts[0].start_time}
          timezone={timelineSetting.timezone}
        />
        <FormGroupStyle row>
          <Label sm={1}>Timezone:</Label>
          <Col>
            <InputStyle 
              type="select"
              onChange={(e) => onSelectTimezone(e, this.props)}
              defaultValue={timelineSetting.timezone}
            >
              <option value={timezone}>{timezone}</option>
              <option value="utc">Use UTC</option>
            </InputStyle>
          </Col>
        </FormGroupStyle>
        <Notes>
          <div>If the time blocks felt out of place due to timezone offset, please view the timeline in UTC format.</div>
          <div>Drag to pan the timeline, mouse scroll to zoom in and out the view.</div>
          <div>Clicking on the time blocks currently does not do anything.</div>
        </Notes>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TimelineViewContainer);