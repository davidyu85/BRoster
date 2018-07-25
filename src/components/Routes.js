/**
 * Routes.js - This component is used to defined the routes throughout the site.
 */

import React from 'react';
import { Route, Switch } from 'react-router';
import TabularViewContainer from '../containers/TabularViewContainer'
import { TimelineView } from './Timeline';

// Please define the routes here.
export const RouteList = (props, onToggleDrawer) => {
  const {
    shifts
  } = props;

  return [
    {
      path: '/',
      component: <TabularViewContainer /> 
    },
    {
      path: '/timeline',
      component: 
        <TimelineView 
          data={shifts}
          defaultTimeStart={shifts[shifts.length - 1].end_time}
          defaultTimeEnd={shifts[0].start_time}
        />
    } 
  ]
};

export const Routes = (props) => (
  <Switch>
    {
      RouteList(props).map((route, i) => 
        <Route exact 
          path={route.path}
          render={() => route.component}
          key={i}
        />
      )
    }
  </Switch>
);
