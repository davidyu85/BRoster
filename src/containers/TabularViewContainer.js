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
import scrollToElement from 'scroll-to-element';
import styled from 'styled-components';
import { 
  openDrawer,
  selectShift,
  setEditMode
} from '../actions';

const Close = styled(FaClose)`
  cursor: pointer;
  float: right;
  
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
    selectShift,
    setEditMode
  }, 
  dispatch
)

// This opens the drawer and changes the selectedShift state, which is 
// displayed in DrawerContentContainer.js
export const onClickOpenDrawer = (shiftId, bool, props) => {
  const { 
    selectShift,
    openDrawer,
    setEditMode
  } = props;
  
  if(shiftId) {
    setEditMode(false);
    selectShift(shiftId);
  }
 
  return openDrawer(bool);
}

class TabularViewContainer extends Component {
  componentWillMount() {
    const { drawer, openDrawer } = this.props;
    
    // To open the drawer with true by default, one must false it first before making a true.
    // So that the drawer can open - this is due to the limitation of the third-party module.
    if(drawer) {
      openDrawer(false);
      setTimeout(() => openDrawer(true), 200);
      setTimeout(() => scrollToElement('#scrollToMe', { align: 'middle' }), 400);
    }
  }
  
  componentWillUnmount() {
    this.props.openDrawer(false);
  }
  
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