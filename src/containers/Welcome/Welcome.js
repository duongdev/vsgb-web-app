import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Helmet from 'react-helmet';

import { Link } from 'react-router-dom';
import { Typography, Button } from 'material-ui';

class Welcome extends React.Component {
  static propTypes = {
    classes: PropTypes.instanceOf(Object).isRequired
  };

  state = {}

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Helmet title="Welcome" />
        <div className={classes.mainSectionWrapper}>
          <div className={classes.mainSection}>
            <Typography type="display2" className={classes.fullWhite}>
              Beansable Vision
            </Typography>
            <Typography type="headline" className={classes.fullWhite}>
              Explore the world!
            </Typography>
            <div className={classes.buttons}>
              <Link to="/sign-up/business">
                <Button raised style={{
                  background: '#00C853',
                  color: '#FFF'
                }}>Business</Button>
              </Link>

              <Link to="/sign-up/customer">
                <Button raised color="accent">Invidual</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = (theme) => ({
  root: {
    animationName: 'fadeIn',
    animationDuration: '1s'
  },
  fullWhite: { color: theme.palette.common.fullWhite },

  mainSectionWrapper: {
    height: window.innerHeight,
    backgroundColor: theme.palette.primary[500],
    display: 'flex',

    '& > div': {
      margin: 'auto'
    }
  },

  mainSection: {
    animationName: 'fadeInUp',
    animationDuration: '1.5s',
  },

  buttons: {
    width: '100%',
    marginTop: theme.spacing.unit * 6,
    display: 'flex',
    marginLeft: -theme.spacing.unit,

    '& > a': {
      width: '50%',
      marginLeft: theme.spacing.unit,

      '& > button': {
        width: '100%'
      }
    }
  }
})

export default withStyles(styles)(Welcome);
