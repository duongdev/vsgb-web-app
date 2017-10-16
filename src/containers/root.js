import React, { Component } from 'react';
import withRoot from 'components/withRoot';
import { withStyles } from 'material-ui/styles';
import MainContainer from './MainContainer';

import 'animate.css/animate.min.css';

class Index extends Component {
  render() {
    return (
      <MainContainer />
    );
  }
}

const styles = () => ({});

export default withRoot(withStyles(styles)(Index));
