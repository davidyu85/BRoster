/**
 * TabularViewContainer.js - The container of the tabular view page.
 * This includes ReactDrawer that can show additional information,
 * triggered by clicking the button on the Tabular component.
 */

import React, { Component } from 'react';
import ReactDrawer from 'react-drawer';
import { Tabular } from '../components/Tabular';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { openDrawer } from '../actions'
import 'react-drawer/lib/react-drawer.css';

// Parse state from Redux store to props.
const mapStateToProps = state => {
  const { 
    shifts, 
    config, 
    drawer 
  } = state;
  
  return {
    shifts,
    config,
    drawer
  };
}

// Enable Redux store dispatch for dispatching an action.
export const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators(
  {
    openDrawer
  }, 
  dispatch
)

export const onClickOpenDrawer = (shiftId, bool, props) => {
  return props.openDrawer(bool);
}

class TabularViewContainer extends Component {
  render() {
    const { 
      shifts,
      config,
      drawer
    } = this.props;
    
    return (
      <div>
        <Tabular
          data={shifts}
          config={config}
          onClickOpenDrawer={(shiftId, bool) => onClickOpenDrawer(shiftId, bool, this.props)}
        />
        <ReactDrawer
          open={drawer}
          position={'right'}
          noOverlay={true}
        >
          <i className="icono-cross"></i>
          <h4>What a nice drawer !</h4>
        </ReactDrawer>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TabularViewContainer);