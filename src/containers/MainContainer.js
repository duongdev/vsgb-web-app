import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import {
  NotFound,
  App,
  SignUp
} from 'containers';

import Helmet from 'react-helmet';

@connect(({ firebase: { authError, auth, profile } }) => ({
  authError, auth, profile
}))
class MainContainer extends Component {
  render() {
    return (
      <Router>
        <div>
          <Helmet
            titleTemplate="%s – vsbg.duongdev.me"
            defaultTitle="Home"
          />
          <Switch>
            <Route path="/sign-up" component={SignUp} />
            <Route path="/" component={App} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default MainContainer;
