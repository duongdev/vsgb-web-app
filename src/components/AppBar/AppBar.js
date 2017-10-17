import React from 'react';
// import PropTypes from 'prop-types';
import Headroom from 'headroom.js';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { NewPostsAvailable } from 'components';

import './AppBar.css';

class MyAppBar extends React.Component {
  static propTypes = {
  };

  state = {}

  componentDidMount() {
    const headroom = new Headroom(document.querySelector('header'));
    headroom.init();
  }

  render() {
    return (
      <AppBar position="fixed" color="primary">
        <NewPostsAvailable />
        <Toolbar>
          <a href="/">
            <Typography type="title" color="default">
              Girls
            </Typography>
          </a>
        </Toolbar>
      </AppBar>
    );
  }
}

export default MyAppBar;
