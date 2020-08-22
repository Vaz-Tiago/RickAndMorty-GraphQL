import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Details from '../pages/Details';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/details/:id" component={Details} />
    <Route path="/" exact component={Home} />
  </Switch>
);

export default Routes;
