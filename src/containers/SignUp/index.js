import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { NotFound } from 'containers';

const SignUp = ({ match }) => (
  <Switch>

    <Route path={`${match.url}/personal`} render={() => (<div>personal</div>)} />

    <Redirect to="/sign-up/personal" />
    <Route component={NotFound} />
  </Switch>);

export default SignUp;
