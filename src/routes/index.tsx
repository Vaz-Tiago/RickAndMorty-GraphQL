import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Details from '../pages/Details';
import NotFound from '../pages/NotFound';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/details/:id" component={Details} />
    <Route path="/" exact component={Home} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
