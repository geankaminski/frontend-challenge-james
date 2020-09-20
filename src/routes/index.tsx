import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Establishment from '../pages/Establishment';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/establishment/:name" component={Establishment} />
  </Switch>
);

export default Routes;
