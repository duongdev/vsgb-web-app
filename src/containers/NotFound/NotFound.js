import React from 'react';
import Helmet from 'react-helmet';
import withStyles from 'material-ui/styles/withStyles';

import { Typography } from 'material-ui';

const NotFound = ({ classes }) => (
  <div className={classes.root}>
    <Helmet title="Page not found" status={404} />
    <div className={classes.content}>
      <Typography className={classes.colorWhite} type="display4">404</Typography>
    </div>
  </div>);

const styles = (theme) => ({
  root: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.error.A200,
    display: 'flex',
    animationName: 'fadeIn',
    animationDuration: '.5s'
  },

  colorWhite: { color: theme.palette.common.fullWhite },

  content: {
    color: theme.palette.common.fullWhite,
    margin: 'auto',
    animationName: 'bounce',
    animationDuration: '1s',
  }
})

export default withStyles(styles)(NotFound);
