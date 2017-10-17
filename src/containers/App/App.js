import $ from 'jquery';
import { sortBy, toArray } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'material-ui/styles/withStyles';
import Masonry from 'react-masonry-component';
import Helmet from 'react-helmet';
import {
  Switch, Route
} from 'react-router-dom';
import withWidth from 'material-ui/utils/withWidth';
import compose from 'recompose/compose';

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { Spinner, PostListItem, Container, PostView, AppBar } from 'components';

import { getPosts, subscribeNewPosts, setRTMode } from 'redux/modules/posts';

@connect(state => ({
  posts: state.posts.entities,
  isLoading: state.posts.isLoading,
  next: state.posts.next
}), { getPosts, subscribeNewPosts, setRTMode })

class App extends React.Component {
  static propTypes = {
    getPosts: PropTypes.func.isRequired,
    subscribeNewPosts: PropTypes.func.isRequired,
    setRTMode: PropTypes.func.isRequired,

    classes: PropTypes.instanceOf(Object).isRequired,
    width: PropTypes.string.isRequired,
    posts: PropTypes.instanceOf(Object),
    isLoading: PropTypes.bool,
    next: PropTypes.number,
  };
  static defaultProps = {
    posts: {},
    isLoading: false
  };

  state = {}

  componentDidMount() {
    const { width } = this.props;

    this.props.getPosts()
    .then(this.props.subscribeNewPosts);

    if (width === 'xs' || width === 'sm') this.props.setRTMode(false);
    $(document).scroll(this.handleScroll);
  }

  handleScroll = (e) => {
    const { width } = this.props;
    const { isLoading } = this.props;
    if (isLoading || !e.target.documentElement) return;

    const target = e.target.documentElement;
    const scrollBottom = target.scrollHeight - target.clientHeight - target.scrollTop

    if (!(width === 'xs' || width === 'sm')) this.props.setRTMode(target.scrollTop === 0);

    if (scrollBottom <= 200) this.handleLoadMore()
  }

  handleLoadMore = () => {
    if (!this.state.canLoadMore) return;
    this.props.getPosts(this.props.next);
  }

  componentWillReceiveProps(nextProps) {
    const { isLoading } = nextProps;
    if (!this.props.isLoading && nextProps.isLoading) {
      this.setState({ canLoadMore: false });
    }
    if (this.props.isLoading && !isLoading) {
      setTimeout(() => this.setState({ canLoadMore: true }), 1000);
    }
  }

  render() {
    const { posts, isLoading, classes } = this.props;

    return (
      <div
        className={classes.app}
      >
        <AppBar />
        <Switch>
          <Route
            path={`/post/:postId`}
            component={PostView}
          />
        </Switch>
        <Helmet title="Girls" />
        <div
          className={classes.main}
          onScroll={this.handleScroll}
        >
          <Container>
            <Masonry
              updateOnEachImageLoad={false}
            >
              {sortBy(toArray(posts), 'timestamp').reverse().map(post => (
                <PostListItem
                  key={post.id}
                  post={post}
                  elementType={Grid}
                />))}
            </Masonry>
            {isLoading && <div style={{ margin: 20, textAlign: 'center' }}><Spinner /></div>}
            {!isLoading &&
              <div style={{ display: 'flex' }}>
                <Button
                  style={{ margin: '20px auto' }}
                  color="primary"
                  onClick={this.handleLoadMore}
                >More photos</Button>
              </div>
            }
          </Container>
        </div>
      </div>
    );
  }
}

const styles = (theme) => {
  return {
    app: {
      top: 0, left: 0, bottom: 0, right: 0,
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 84,
      position: 'relative'
    },
    main: {
      flexGrow: 1,
      overflow: 'hidden'
    }
  };
}

export default compose(withStyles(styles), withWidth())(App);
