import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';
import withStyles from 'material-ui/styles/withStyles';

import { appendPendingPosts } from 'redux/modules/posts';

@connect(state => ({
  pendingPostsCount: state.posts.pendingPostsCount
}), { appendPendingPosts })

class NewPostsAvailable extends React.Component {
  static propTypes = {
    appendPendingPosts: PropTypes.func.isRequired,

    classes: PropTypes.instanceOf(Object).isRequired,
    pendingPostsCount: PropTypes.number.isRequired
  };

  state = {}

  componentDidMount() {
    $(ReactDOM.findDOMNode(this)).hide();
  }

  handleAppendPosts = () => {
    this.props.appendPendingPosts();
  }

  scrollToTop = () => {
    $('html, body')
    .animate({
      scrollTop: '0px'
    }, 1000, 'easeOutBounce',
      () => {
        this.handleAppendPosts();
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pendingPostsCount && !this.props.pendingPostsCount) {
      $(ReactDOM.findDOMNode(this)).fadeIn();
    }
    if (!nextProps.pendingPostsCount && this.props.pendingPostsCount) {
      $(ReactDOM.findDOMNode(this)).fadeOut();
    }
  }

  render() {
    const { classes, pendingPostsCount } = this.props;

    return (
      <div className={classes.container}>
        <Button
          color="accent"
          dense
          raised
          className={classes.button}
          onClick={this.scrollToTop}
        >
          {pendingPostsCount} new photo{pendingPostsCount > 1 ? 's' : ''}
        </Button>
      </div>
    );
  }
}

const styles = (theme) => ({
  container: {
    margin: 'auto',
    opacity: 0.8,
    transition: '.3s',
    display: 'flex',
    justifyContent: 'center',

    '&:hover': {
      opacity: 1
    }
  },
  button: {
    position: 'absolute',
    bottom: -48
  }
})

export default withStyles(styles)(NewPostsAvailable);
