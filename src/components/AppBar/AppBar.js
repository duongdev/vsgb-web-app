import React from 'react';
import PropTypes from 'prop-types';
import Headroom from 'headroom.js';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import './AppBar.css';

class MyAppBar extends React.Component {
  static propTypes = {
    name: PropTypes.string,
  };

  state = {}

  componentDidMount() {
    const headroom = new Headroom(document.querySelector("header"));
    headroom.init();
    Headroom.options = {
      onPin: () => console.log('onPin')
    };
  }

  render() {
    return (
      <AppBar position="fixed" color="primary">
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
