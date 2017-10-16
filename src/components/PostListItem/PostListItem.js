import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import Hidden from 'material-ui/Hidden';

import { withStyles } from 'material-ui/styles';

import ActorAndCaption from './components/ActorAndCaption';

class PostListItem extends React.Component {
  static propTypes = {
    classes: PropTypes.instanceOf(Object).isRequired,
    post: PropTypes.instanceOf(Object).isRequired
  };

  state = {
    hover: false
  }

  render() {
    const { classes, post } = this.props;
    const { hover } = this.state;

    return (
      <Grid
        className={classes.postItem}
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={2}
      >
        <Paper
          className={classes.paper}
          onMouseEnter={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false })}
        >
          <div style={{ position: 'relative' }}>
            <Hidden smDown>
              <Link
                to={{
                  pathname: `/post/${post.id}`,
                  state: { fromHome: true }
                }}
              >
                <img
                  className={classes.img}
                  src={post.imageURL}
                  alt={post.actor.name}
                />
              </Link>
            </Hidden>
            <Hidden mdUp>
              <Link
                to={post.link}
                target="_blank"
              >
                <img
                  className={classes.img}
                  src={post.imageURL}
                  alt={post.actor.name}
                />
              </Link>
            </Hidden>

            <Hidden smDown>
              <ActorAndCaption
                post={post}
                classes={classes.postContent}
                hover={hover}
              />
            </Hidden>
          </div>

          <Hidden mdUp>
            <ActorAndCaption
              post={post}
              classes={classes.postContentMobile}
              hover
            />
          </Hidden>
        </Paper>
      </Grid>);
  }
}

const styles = theme => ({
  postItem: {
    // width: 368,
    padding: 8,
    width: '100%'
  },
  paper: {
    position: 'relative'
  },
  itemContent: {
    margin: 20,
    position: 'relative',
    width: '20%'
  },
  img: {
    width: '100%',
    height: 'auto',
    marginBottom: -4,
    borderRadius: 2
  },
  caption: {
    position: 'absolute',
    bottom: 10
  },

  postContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.52)',
    color: 'rgba(255, 255, 255, 0.7)',
    display: 'flex',
    padding: 10,
    opacity: 0,
    transition: '.3s',
    maxHeight: '50%'
  },

  postContentMobile: {
    maxHeight: 100,
    display: 'flex',
    padding: 10,
    color: 'rgba(255, 255, 255, 0.7)',
  }
});

export default withStyles(styles)(PostListItem);
