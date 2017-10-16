import $ from 'jquery';
import React from 'react';
import PropTypes from 'prop-types';
import Fade from 'material-ui/transitions/Fade';
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
    in: true
  }

  componentDidMount() {
    document.documentElement.style.overflow = 'hidden';
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

  render() {
    const { posts, match: { params: { postId } } } = this.props;
    const post = posts[postId];

    return (
      <Fade
        in={this.state.in}
        onExited={this.handleExit}
      >
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, bottom: 0, right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 9e9,
            display: 'flex',
            color: 'rgba(255, 255, 255, 0.7)',
            padding: 16
          }}
          onKeyDown={e => console.log(e.keyCode)}
        >
          {post ?
            <div style={{
              flexGrow: 1, display: 'flex',
              backgroundImage: `url(${post.imageURL})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              padding: 16,
              position: 'relative'
            }}>
              <IconButton
                style={{
                  position: 'absolute',
                  right: -16,
                  top: -16
                }}
                color="contrast"
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>
            </div> :
            <div style={{ margin: 'auto' }}><Spinner /></div>}
        </div>
      </Fade>
    );
  }
}

export default PostView;
