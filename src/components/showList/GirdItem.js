import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    columnBreakInside: 'avoid',
    marginBottom: 8,
    display: 'inline-block',
    marginTop: 8
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
    padding: 10
  }
});

const GirdItem = (props) => {
  const { classes, item } = props;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <img
          className={classes.img}
          src={item.imageURL}
          alt={item.caption}
        />
        <div className={classes.postContent}>
          <a
            href={item.actor.link}
            target="_blank"
          >
            <Avatar
              src={item.actor.avatar}
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
                href={item.actor.link}
                target="_blank"
              >{item.actor.name}</a>
            </div>
            <div style={{
              lineHeight: 1.2
            }}>{item.caption}</div>
          </div>
        </div>
      </Paper>
    </div>);
}

GirdItem.PropTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(GirdItem);
