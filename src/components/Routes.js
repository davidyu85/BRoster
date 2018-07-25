/**
 * Routes.js - This component is used to defined the routes throughout the site.
 */

import React from 'react';
import { Route, Switch } from 'react-router';
import { Tabular } from './Tabular';
import { TimelineView } from './Timeline';

// Please define the routes here.
export const RouteList = (props) => {
  const { shifts, config } = props;
  
  return [
    {
      path: '/',
      component:
        <Tabular
          data={shifts}
          config={config}
        />
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
