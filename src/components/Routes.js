/**
 * Routes.js - This component is used to defined the routes throughout the site.
 */

import React from 'react';
import { Route, Switch } from 'react-router';
import TabularViewContainer from '../containers/TabularViewContainer';
import TimelineViewContainer from '../containers/TimelineViewContainer';

// Please define the routes here.
export const RouteList = (props) => {
  return [
    {
      path: '/',
      component: <TabularViewContainer /> 
    },
    {
      path: '/timeline',
      component: <TimelineViewContainer />
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
