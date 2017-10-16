import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import StarBorderIcon from 'material-ui-icons/StarBorder';
import { withStyles } from 'material-ui/styles';
import firebase from 'firebase';
import { CircularProgress } from 'material-ui/Progress';

import GirdItem from './GirdItem';

  const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      background: theme.palette.background.paper,
    },
    gridList: {
      columnWidth: 320,
      columnGap: 15,
      width: '90%',
      maxWidth: 1100,
      margin: '50px auto'
    },
    titleBar: {
      background:
        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    img: {
      width: '100%',
      height: 'auto',
    }
  });

const Spinner = () => (
  <div style={{
    margin: '20px auto',
    textAlign: 'center'
  }}><CircularProgress /></div>);

class List extends Component {
  state = {
    isLoading: true,
    posts: {}
  }

  componentDidMount() {
    firebase.initializeApp({
      piKey: "AIzaSyCQp_PfjcZ5hHfGCD0uWeN7uamuzMnhWig",
      authDomain: "mac-pro-ebf51.firebaseapp.com",
      databaseURL: "https://mac-pro-ebf51.firebaseio.com",
      projectId: "mac-pro-ebf51",
      storageBucket: "mac-pro-ebf51.appspot.com",
      messagingSenderId: "443723329218",
      log: true
    });

    this.getPosts();
  }

  getPosts = (startAt = 0, limit = 15) => {
    console.log(startAt);
    firebase.database().ref(`/VNsbGroup`)
    .orderByChild('timestamp')
    .startAt(startAt)
    .limitToFirst(limit)
    .once('value', (snapshot) => {
      const value = snapshot.val();
      const posts = {
        ...this.state.posts,
        ...value
      }
      this.setState({
        posts,
        isLoading: false
      });
    });
  }

  loadMore = () => {
    const posts = Object.values(this.state.posts);
    const lastPostTS = posts[posts.length - 1].timestamp;
    this.setState({ isLoading: true });

    this.getPosts(lastPostTS);
  }

  render() {
    const { classes } = this.props;
    const { posts, isLoading } = this.state;
    if (!posts) {
      return <Spinner />;
    }

    return (
     <div>
      <div className={classes.gridList}>
        {Object.values(posts).map(post => (
          <GirdItem key={post.id} item={post}/>
        ))}
      </div>
      {isLoading && <Spinner />}
      <div style={{
        textAlign: 'center',
        margin: 40
      }}>
        <Button
          color="primary"
          onClick={this.loadMore}
        >
          Load more
        </Button>
      </div>
    </div>
    );
  }
}

List.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(List);
