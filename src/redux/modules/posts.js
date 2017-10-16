import { first } from 'lodash';
const GET_POSTS = 'redux/posts/GET_POSTS';
const GET_POSTS_SUCCESS = 'redux/posts/GET_POSTS_SUCCESS';

const initialState = {
  entities: {},
  next: null
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
        next: first(Object.values(action.posts)).id
      };
    }
    default: return state;
  }
}

export const getPosts = (endAt, limit = 15) => (dispatch, getState, getFirebase) => {
  dispatch({ type: GET_POSTS });

  const firebase = getFirebase();
  let query = firebase.database().ref(`/VNsbGroup`)
  .orderByChild('id');

  if (endAt) {
    query = query.endAt(endAt);
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
