import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';

import { withStyles } from 'material-ui/styles';

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
      >
        <Paper
          className={classes.paper}
          onMouseEnter={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false })}
        >
          <img
            className={classes.img}
            src={post.imageURL}
            alt={post.caption}
          />
          <div
            className={classes.postContent}
            style={{
              opacity: hover ? 1 : 0
            }}
          >
            <a
              href={post.actor.link}
              target="_blank"
            >
              <Avatar
                src={post.actor.avatar}
              />
            </a>
            <div style={{
              textAlign: 'left',
              marginLeft: 10
            }}>
              <div style={{
                marginBottom: 5,
                fontWeight: 500
              }}>
                <a
                  href={post.actor.link}
                  target="_blank"
                >{post.actor.name}</a>
              </div>
              <div style={{
                lineHeight: 1.2
              }}>{post.caption}</div>
            </div>
          </div>
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
    transition: '.3s'
  }
});

export default withStyles(styles)(PostListItem);
