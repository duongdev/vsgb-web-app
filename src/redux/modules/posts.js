import { toArray, minBy, maxBy, size } from 'lodash';
const GET_POSTS = 'redux/posts/GET_POSTS';
const GET_POSTS_SUCCESS = 'redux/posts/GET_POSTS_SUCCESS';
const GET_POST_SUCCESS = 'redux/posts/GET_POST_SUCCESS';

const REAL_TIME_UPDATED = 'redux/posts/REAL_TIME_UPDATED';
const APPEND_PENDING_POSTS = 'redux/posts/APPEND_PENDING_POSTS';
const RT_MODE_UPDATED = 'redux/posts/RT_MODE_UPDATED';

const initialState = {
  entities: {},
  pendingPosts: {},
  pendingPostsCount: 0,
  next: null,
  RTMode: true
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_POSTS: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_POSTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        entities: {
          ...state.entities,
          ...action.posts
        },
        next: findNext({...action.posts, ...state.entities})
      };
    }

    case GET_POST_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.post.id]: action.post
        }
      };

    case REAL_TIME_UPDATED:
      return {
        ...state,
        pendingPosts: action.posts,
        pendingPostsCount: Object.keys(action.posts).length
      };

    case APPEND_PENDING_POSTS:
      return {
        ...state,
        entities: {
          ...state.entities,
          ...state.pendingPosts
        },
        pendingPosts: {},
        pendingPostsCount: 0
      };

    case RT_MODE_UPDATED:
      return {
        ...state,
        RTMode: action.RTMode
      };

    default: return state;
  }
}

export const getPosts = (endAt, limit = 15) => (dispatch, getState, getFirebase) => {
  dispatch({ type: GET_POSTS });

  const firebase = getFirebase();
  let query = firebase.database().ref(`/all`)
  .orderByChild('timestamp');

  if (endAt) {
    query = query.endAt(endAt * 1);
  }
  query = query.limitToLast(limit)
  .once('value', (snapshot) => {
    const posts = snapshot.val();
    dispatch({
      type: GET_POSTS_SUCCESS,
      posts
    })
  });
  return query;
};

export const getPost = postId => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  firebase.database().ref(`/all/${postId}`)
  .once('value', (snapshot) => {
    const post = snapshot.val();
    dispatch({
      type: GET_POST_SUCCESS,
      post
    })
  });
}

export const subscribeNewPosts = () => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  const firstPost = maxBy(toArray(getState().posts.entities), 'timestamp');

  const ref = firebase.database().ref(`/all`);

  ref.orderByChild('timestamp')
  .startAt(firstPost.timestamp)
  .on('value', snapshot => {
    const newPosts = snapshot.val();
    const pendingPosts = getState().posts.pendingPosts;
    const RTMode = getState().posts.RTMode;

    if (newPosts[firstPost.id]) delete newPosts[firstPost.id];

    if (size(newPosts) === size(pendingPosts)) return;

    if (RTMode) dispatch({ type: GET_POSTS_SUCCESS, posts: newPosts });
    else dispatch({ type: REAL_TIME_UPDATED, posts: newPosts });
    // dispatch({ type: GET_POST_SUCCESS, post: toArray(newPosts)[0] });

    ref.off();
    dispatch(subscribeNewPosts());
  });
  return ref;
};

export const appendPendingPosts = () => ({ type: APPEND_PENDING_POSTS });

export const setRTMode = RTMode => ({ type: RT_MODE_UPDATED, RTMode });

const findNext = (posts) => {
  const lastPost = minBy(toArray(posts), 'timestamp');
  if (!lastPost) return null;
  return lastPost.timestamp;
};
