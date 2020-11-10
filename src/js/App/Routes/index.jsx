import React, {Component, lazy} from 'react';
import {Switch, Route} from 'react-router-dom';

import asyncComponent from '../HOC/asyncComponent';

const Home = lazy(() => import('../Components/Home'));
const Login = lazy(() => import('../Components/Login'));

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route
          path={'/login'}
          exact
          component={asyncComponent(Login)}
        />
        <Route
          path={'/'}
          exact
          component={asyncComponent(Home)}
        />
      </Switch>
    );
  }
}

export default Routes;
