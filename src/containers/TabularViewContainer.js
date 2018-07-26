/**
 * TabularViewContainer.js - The container of the tabular view page.
 * This includes ReactDrawer that can show additional information,
 * triggered by clicking the button on the Tabular component.
 */

import React, { Component } from 'react';
import ReactDrawer from 'react-drawer';
import DrawerContentContainer from './DrawerContentContainer';
import { FaClose } from 'react-icons/lib/fa';
import { Tabular } from '../components/Tabular';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { openDrawer, selectShift } from '../actions';

const Close = styled(FaClose)`
  cursor: pointer;
  position: absolute;
  
  :hover {
    color: #600;
  }
`;

// Passing down all states from Redux store to props.
const mapStateToProps = state => state;

// Enable Redux store dispatch for dispatching an action.
export const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators(
  {
    openDrawer,
    selectShift
  }, 
  dispatch
)

// This opens the drawer and changes the selectedShift state, which is 
// displayed in DrawerContentContainer.js
export const onClickOpenDrawer = (shiftId, bool, props) => {
  const { 
    selectShift,
    openDrawer
  } = props;
  
  if(shiftId) selectShift(shiftId);
 
  return openDrawer(bool);
}

class TabularViewContainer extends Component {
  render() {
    const { 
      shifts,
      selectedShift,
      config,
      drawer,
      openDrawer
    } = this.props;
    
    return (
      <div>
        <Tabular
          data={shifts}
          selectedData={selectedShift}
          config={config}
          onClickOpenDrawer={(shiftId, bool) => 
            onClickOpenDrawer(shiftId, bool, this.props)
          }
        />
        <ReactDrawer
          open={drawer}
          position={'right'}
          noOverlay={true}
        >
          <Close size={40} onClick={() => openDrawer(false)} /> 
          <DrawerContentContainer />
        </ReactDrawer>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TabularViewContainer);