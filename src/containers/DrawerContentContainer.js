/**
 * DrawerContentContainer.js - The container of content page displayed.
 * in the side-drawer.
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { DrawerContent } from '../components/DrawerContent';
import DrawerEditShift from '../components/DrawerEditShift';
import { 
  setEditMode,
  initToBeConfirmedShift,
  clearToBeConfirmedShift,
  setToBeConfirmedShift,
  saveEditedShift
} from '../actions';

const Wrapper = styled.div`
  p {
    font-size: 14px;
    margin-bottom: 4px;
  }
`;

// Passing down all states from Redux store to props.
const mapStateToProps = state => state;

// Enable Redux store dispatch for dispatching an action. These actions are passed
// down to the components to be called in there, rather than here in the container.
export const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators(
  {
    setEditMode,
    initToBeConfirmedShift,
    clearToBeConfirmedShift,
    setToBeConfirmedShift,
    saveEditedShift
  }, 
  dispatch
)

class DrawerContentContainer extends Component {
  render() {
    return (
      <Wrapper>
        { 
          this.props.editMode ? 
            <DrawerEditShift allProps={this.props} /> :
            <DrawerContent allProps={this.props} />
        }
      </Wrapper>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContentContainer);