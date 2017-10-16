import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import { Spinner } from 'components';

import { getPost } from 'redux/modules/posts';

@connect(state => ({
  posts: state.posts.entities
}), { getPost })

class PostView extends React.Component {
  static propTypes = {
    name: PropTypes.string,
  };

  state = {
    in: false,
    fix: false
  }

  componentDidMount() {
    document.documentElement.style.overflow = 'hidden';

    setTimeout(() => {
      this.setState({ in: true })
    }, 100);

    const { posts, match: { params: { postId } } } = this.props;
    const post = posts[postId];

    if (!post) {
      this.props.getPost(postId);
    }
  }

  componentWillUnmount() {
    document.documentElement.style.overflow = 'auto';
  }

  handleClose = () => {
    setTimeout(() => {
      this.setState({ in: false })
      this.handleExit()
    }, 200);
    // this.props.history.goBack();
  }

  handleExit = () => {
    const { history, location: { state } } = this.props;
    if (state && state.fromHome) {
      history.goBack();
    } else {
      history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    setTimeout(() => {
      this.setState({ in: true })
    }, 100);
  }

  render() {
    const { posts, match: { params: { postId } } } = this.props;
    const post = posts[postId];

    return (
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0, bottom: 0, right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 9e9,
          display: 'flex',
          color: 'rgba(255, 255, 255, 0.7)',
          padding: 16,
          justifyContent: 'center',
          transition: '.3s',
          opacity: this.state.in ? 1 : 0
        }}
        onClick={this.handleClose}
      >
        <IconButton
          style={{
            position: 'absolute',
            top: 0,
            right: 0
          }}
          color="contrast"
          // onClick={this.handleClose}
        >
          <CloseIcon />
        </IconButton>
        {post ?
          <a
            href={post.link}
            target="_blank"
            style={{ display: 'inline-flex' }}
          >
            <img
              src={post.imageURL}
              alt={post.actor.name}
              onClick={e => e.stopPropagation()}
              style={{
                width: 'auto',
                height: this.state.in ? '100%' : 'inherit'
              }}
            />
          </a> :
          <div style={{ margin: 'auto' }}><Spinner /></div>}
      </div>
    );
  }
}

export default PostView;
